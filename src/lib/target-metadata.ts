import cache from "./cache";

export interface TargetMetadata {
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  siteName?: string;
}

const META_TTL_MS = 24 * 60 * 60 * 1000;
const FAILURE_TTL_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 6500;
const MAX_HTML_BYTES = 300_000;

// Browser-like headers: bot-protected sites (Akamai, Cloudflare) refuse
// unknown crawler user-agents, which breaks previews for those targets
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'");
}

function extractMetaContent(html: string, key: string): string | undefined {
  // Match <meta property="og:x" content="..."> in either attribute order
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`,
      "i"
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeEntities(match[1].trim());
  }
  return undefined;
}

function parseImageDimensions(
  bytes: Uint8Array
): { width: number; height: number } | null {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  // PNG: IHDR width/height at fixed offsets after the 8-byte signature
  if (
    bytes.length > 24 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return { width: view.getUint32(16), height: view.getUint32(20) };
  }

  // GIF: little-endian dimensions right after the "GIF8xa" header
  if (bytes.length > 10 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return {
      width: view.getUint16(6, true),
      height: view.getUint16(8, true),
    };
  }

  // WebP: RIFF....WEBP followed by VP8/VP8L/VP8X chunk
  if (
    bytes.length > 30 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    const chunk = String.fromCharCode(bytes[12], bytes[13], bytes[14], bytes[15]);
    if (chunk === "VP8X") {
      return {
        width: 1 + (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16)),
        height: 1 + (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16)),
      };
    }
    if (chunk === "VP8 ") {
      return {
        width: view.getUint16(26, true) & 0x3fff,
        height: view.getUint16(28, true) & 0x3fff,
      };
    }
    if (chunk === "VP8L") {
      const b = bytes;
      const width = 1 + (((b[22] & 0x3f) << 8) | b[21]);
      const height =
        1 + (((b[24] & 0x0f) << 10) | (b[23] << 2) | ((b[22] & 0xc0) >> 6));
      return { width, height };
    }
  }

  // JPEG: walk segments until a start-of-frame marker carries the dimensions
  if (bytes.length > 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = bytes[offset + 1];
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      ) {
        return {
          height: view.getUint16(offset + 5),
          width: view.getUint16(offset + 7),
        };
      }
      offset += 2 + view.getUint16(offset + 2);
    }
  }

  return null;
}

async function probeImageSize(
  imageUrl: string
): Promise<{ width: number; height: number } | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const response = await fetch(imageUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        ...FETCH_HEADERS,
        // Header bytes are enough for every supported format
        Range: "bytes=0-65535",
      },
    });
    clearTimeout(timer);
    if (!response.ok) return null;

    // If the server ignored the Range request, avoid downloading huge files
    const contentLength = Number(response.headers.get("content-length") ?? 0);
    if (response.status === 200 && contentLength > 5_000_000) return null;

    const bytes = new Uint8Array(await response.arrayBuffer());
    return parseImageDimensions(bytes);
  } catch {
    return null;
  }
}

function parseHtml(html: string, baseUrl: string): TargetMetadata {
  const titleTag = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();

  let image =
    extractMetaContent(html, "og:image") ??
    extractMetaContent(html, "twitter:image");
  if (image) {
    try {
      image = new URL(image, baseUrl).href;
    } catch {
      image = undefined;
    }
  }

  const declaredWidth = Number(extractMetaContent(html, "og:image:width"));
  const declaredHeight = Number(extractMetaContent(html, "og:image:height"));

  return {
    title:
      extractMetaContent(html, "og:title") ??
      extractMetaContent(html, "twitter:title") ??
      (titleTag ? decodeEntities(titleTag) : undefined),
    description:
      extractMetaContent(html, "og:description") ??
      extractMetaContent(html, "twitter:description") ??
      extractMetaContent(html, "description"),
    image,
    imageWidth: declaredWidth > 0 ? declaredWidth : undefined,
    imageHeight: declaredHeight > 0 ? declaredHeight : undefined,
    imageAlt:
      extractMetaContent(html, "og:image:alt") ??
      extractMetaContent(html, "twitter:image:alt"),
    siteName: extractMetaContent(html, "og:site_name"),
  };
}

export async function getTargetMetadata(
  shortCode: string,
  targetUrl: string
): Promise<TargetMetadata | null> {
  const cacheKey = `meta:${shortCode}`;

  const cached = await cache.get(cacheKey);
  if (cached) {
    try {
      const { fetchedAt, meta } = JSON.parse(cached);
      const ttl = meta === null ? FAILURE_TTL_MS : META_TTL_MS;
      if (Date.now() - fetchedAt < ttl) return meta;
    } catch {
      // fall through to refetch
    }
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: FETCH_HEADERS,
    });
    clearTimeout(timer);

    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.includes("html")) {
      await cache.set(
        cacheKey,
        JSON.stringify({ fetchedAt: Date.now(), meta: null })
      );
      return null;
    }

    const html = (await response.text()).slice(0, MAX_HTML_BYTES);
    const meta = parseHtml(html, response.url || targetUrl);

    // Facebook/WhatsApp skip the image on first share unless dimensions are
    // declared; probe the file when the target page doesn't provide them
    if (meta.image && (!meta.imageWidth || !meta.imageHeight)) {
      const size = await probeImageSize(meta.image);
      if (size) {
        meta.imageWidth = size.width;
        meta.imageHeight = size.height;
      }
    }

    await cache.set(
      cacheKey,
      JSON.stringify({ fetchedAt: Date.now(), meta })
    );
    return meta;
  } catch {
    return null;
  }
}
