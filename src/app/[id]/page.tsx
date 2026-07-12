import { prisma } from "@/lib/prisma";
import cache from "@/lib/cache";
import { getTargetMetadata } from "@/lib/target-metadata";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import RedirectCountdown from "./RedirectCountdown";
export const dynamic = "force-dynamic";

// Link-preview crawlers that need the target site's metadata
const PREVIEW_BOT_RE =
  /facebookexternalhit|facebookcatalog|twitterbot|slackbot|discordbot|whatsapp|telegrambot|linkedinbot|pinterest|redditbot|skypeuripreview|vkshare|snapchat|iframely|embedly|quora link preview|googlebot|bingbot|applebot|yandex/i;

async function resolveTargetUrl(id: string): Promise<string> {
  const cachedUrl = await cache.get(id);
  if (cachedUrl) return cachedUrl;

  const urlData = await prisma.url.findUnique({
    where: { shortCode: id },
  });

  if (!urlData) {
    notFound();
  }

  await cache.set(id, urlData.originalUrl);
  return urlData.originalUrl;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const targetUrl = await resolveTargetUrl(id);

  // Only pay the target-fetch cost for preview bots; humans never wait on it
  const userAgent = (await headers()).get("user-agent") ?? "";
  const meta = PREVIEW_BOT_RE.test(userAgent)
    ? await getTargetMetadata(id, targetUrl)
    : null;

  let targetHost = "";
  try {
    targetHost = new URL(targetUrl).hostname.replace(/^www\./, "");
  } catch {
    // leave empty
  }

  const title = meta?.title ?? (targetHost || "Tinyur");
  const description = meta?.description ?? targetUrl;

  // Fall back to the target's favicon via Google's icon service, which
  // resolves even when the target site blocks our server's requests
  const image = meta?.image
    ? {
        url: meta.image,
        width: meta.imageWidth,
        height: meta.imageHeight,
        alt: meta.imageAlt,
      }
    : targetHost
      ? {
          url: `https://www.google.com/s2/favicons?domain=${targetHost}&sz=256`,
          width: 256,
          height: 256,
          alt: targetHost,
        }
      : {
          url: "https://tinyur.in/opengraph-image.png",
          width: 1920,
          height: 1008,
          alt: "Tinyur URL Shortener",
        };

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `https://tinyur.in/${id}`,
      siteName: meta?.siteName ?? "Tinyur",
      images: [image],
      type: "website",
    },
    twitter: {
      // A favicon renders as a small square card; real images go large
      card: meta?.image ? "summary_large_image" : "summary",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const targetUrl = await resolveTargetUrl(id);

  await prisma.url.update({
    where: { shortCode: id },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  return <RedirectCountdown url={targetUrl} />;
}
