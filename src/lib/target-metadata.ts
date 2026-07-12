import cache from "./cache";

export interface TargetMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

const META_TTL_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 4000;
const MAX_HTML_BYTES = 300_000;

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
      if (Date.now() - fetchedAt < META_TTL_MS) return meta;
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
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TinyurBot/1.0; +https://tinyur.in)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timer);

    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.includes("html")) return null;

    const html = (await response.text()).slice(0, MAX_HTML_BYTES);
    const meta = parseHtml(html, response.url || targetUrl);

    await cache.set(
      cacheKey,
      JSON.stringify({ fetchedAt: Date.now(), meta })
    );
    return meta;
  } catch {
    return null;
  }
}
