import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/next"
import Analytics from "@/components/Analytics";
import Script from "next/script";
import Footer from "@/components/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Tinyur url shortener platform | Free & No Ads",
  description: "URL Shortener, No Ads, No Tracking, No BS",

  keywords: [
    "URL Shortener",
    "Tinyur url shortener",
    "Tinyur url shortning platform",
    "Free URL Shortener",
    "No Ads",
    "Open Source URL Shortener",
    "No Tracking",
    "No BS",
    "Open Source URL Shortener",
    "Simple URL Shortener",
    "Tinyur",
    "Tinyur url shortener platform",
    "Tinyur url shortning platform",
    "Free and Unlimited URL Shortener",
    "Unlimited Hits url shortner",
    "Zero pricing url shortner",
  ],
  icons: "/icon.png",
  robots: {
    index: true,
    follow: true,
    nocache: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://tinyur.in"),
  openGraph: {
    images: {
      url: "https://tinyur.in/icon.png",
      height: 64,
      width: 64,
      alt: "Tinyur URL Shortener, Free & No Ads",
    },
    title: "Tinyur URL Shortener, Free & No Ads",
    description: "Free URL Shortener, No Ads, No Tracking, No BS",
    url: "https://tinyur.in",
    type: "website",
    siteName: "Tinyur URL Shortener",
    locale: "en_US",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinyur URL Shortener, Free & No Ads",
    description: "Free URL Shortener, No Ads, No Tracking, No BS",
    images: [
      {
        url: "https://tinyur.in/icon.png",
        width: 64,
        height: 64,
      },
    ],
    site: "@tinyur",
    creator: "@tinyur",
    creatorId: "1234567890",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7464509288176224"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className={`${nunito.variable} font-sans antialiased`}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: `
            radial-gradient(circle at top center, #1e3a8a 0%, #1e40af 40%, transparent 70%),
            #000000
          `,
          }}
        />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url(/grain.png)",
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay",
          }}
        />

        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
