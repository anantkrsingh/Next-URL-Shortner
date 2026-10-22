import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short Links for WhatsApp, Instagram, SMS, and Email: A Channel Guide | Tinyur",
  description:
    "How links behave on WhatsApp, Instagram, X, LinkedIn, SMS, and email — character limits, link previews, where links are clickable — and how to use short links well on each.",
  alternates: {
    canonical: "https://tinyur.in/blogs/short-links-for-social-media",
  },
  openGraph: {
    title: "Short Links for WhatsApp, Instagram, SMS, and Email | Tinyur",
    description:
      "A channel-by-channel guide to sharing links on WhatsApp, Instagram, X, LinkedIn, SMS, and email.",
    url: "https://tinyur.in/blogs/short-links-for-social-media",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Short Links for WhatsApp, Instagram, SMS, and Email",
    description:
      "A channel-by-channel guide to sharing links on WhatsApp, Instagram, X, LinkedIn, SMS, and email.",
  },
};

const channels = [
  {
    name: "WhatsApp",
    body: "Links in WhatsApp chats are clickable and usually show a preview card built from the destination page's title and image. Long URLs wrap across several lines on phones and look suspicious in group chats, so a short link with a readable alias keeps messages clean. Put the link on its own line, and write a sentence explaining what it is — forwarded messages with a bare link are exactly what people have learned to distrust.",
  },
  {
    name: "Instagram",
    body: "Links in regular post captions are not clickable, which is why \"link in bio\" exists. Your bio link, story link stickers, and DMs are the places links work. Because you can only have a limited number of bio links, a short link you can repoint — or a simple link-in-bio page — saves editing your profile every time you promote something new. In captions, a short readable alias still helps people who want to type it.",
  },
  {
    name: "X (Twitter)",
    body: "X wraps every link in its own t.co shortener and counts each link as a fixed number of characters regardless of length, so shortening doesn't save characters there. What it does give you is a readable, trustworthy link in the visible text and a separate click count from X's own analytics, which helps when you compare platforms.",
  },
  {
    name: "LinkedIn",
    body: "LinkedIn shows link previews in posts and allows links in comments. Many creators believe posts with external links get less reach, so they move the link into the first comment. Whichever approach you use, a branded or descriptive short link looks more professional than a long URL full of tracking parameters.",
  },
  {
    name: "SMS",
    body: "SMS is where shortening matters most. A standard text message holds 160 characters, and a long tracked URL can take up most of that. Short links leave room for the actual message and reduce the chance of carriers splitting it into multiple parts. Many carriers filter messages with suspicious links, so always say who the message is from and what the link is for.",
  },
  {
    name: "Email",
    body: "Emails can hide the URL behind link text, so length matters less. Short links still help in plain-text emails, in signatures, and anywhere a reader might copy the link. Avoid making every link in a marketing email a different shortener domain — some spam filters treat heavy use of generic shorteners as a warning sign. One consistent short domain is fine.",
  },
];

export default function ShortLinksForSocialMediaPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link prefetch={false}
            href="/blogs"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
              URL Shortening
            </span>
            <span className="text-white/40 text-sm">~9 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Short Links for WhatsApp, Instagram, SMS, and Email: A Channel Guide
          </h1>

          <p className="text-xl text-white/70 leading-relaxed">
            Every platform treats links differently. Some make them unclickable, some rewrite them, and some judge your message by them. Here&apos;s how to share links well on each one.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Why Link Format Matters</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              A link is often the only thing between your message and the action you want someone to take. People decide in a second or two whether to tap it, and they judge it by what they can see: its length, whether it&apos;s readable, and whether it looks like it came from someone they trust.
            </p>
            <p className="text-white/70 leading-relaxed">
              Short links help with all three, but the right way to use them depends on the channel. A link that&apos;s perfect for SMS can be pointless on X, and a link that works in an Instagram story won&apos;t work in a caption.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Channel by Channel</h2>
            <div className="space-y-6">
              {channels.map((channel) => (
                <div key={channel.name} className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">{channel.name}</h3>
                  <p className="text-white/70">{channel.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Link Previews: Fix Them at the Destination</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              The preview card you see on WhatsApp, LinkedIn, Slack, or iMessage is built from the destination page&apos;s Open Graph tags — <code className="text-blue-400">og:title</code>, <code className="text-blue-400">og:description</code>, and <code className="text-blue-400">og:image</code>. A short link follows the redirect, so the card shows the destination&apos;s details.
            </p>
            <p className="text-white/70 leading-relaxed">
              If the preview looks wrong or empty, the fix is on the page you&apos;re linking to, not the link. Platforms also cache previews, so after fixing the tags, it can take a while for the new card to appear; most platforms offer a debugging tool that forces a refresh.
            </p>
          </section>

          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">One Link Per Channel</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              If you share the same offer on WhatsApp, Instagram, and email, create a separate short link for each one. They all point to the same page, but each collects its own clicks, so you can see which channel worked. Descriptive aliases like <code className="text-blue-400">/offer-wa</code>, <code className="text-blue-400">/offer-insta</code>, and <code className="text-blue-400">/offer-mail</code> keep them easy to tell apart.
            </p>
            <p className="text-white/70 leading-relaxed">
              We cover how to read those numbers in <Link prefetch={false} href="/blogs/measuring-link-clicks" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">How to Measure Link Clicks</Link>, and how to pick good aliases in <Link prefetch={false} href="/blogs/custom-alias-guide" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">our custom alias guide</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Earning the Click Without Losing Trust</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Say what&apos;s behind the link.</strong> &quot;Our menu for this week&quot; outperforms &quot;check this out&quot; and reassures people it isn&apos;t spam.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Use a readable alias.</strong> A word in the link reassures people far more than a random string.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Test before sending.</strong> Click your own link on a phone, on mobile data, before it goes to thousands of people.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Don&apos;t over-shorten.</strong> In emails with clickable link text, a clean link to your own domain is often better than a shortened one.</span>
              </li>
            </ul>
          </section>

          <section className="backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>SMS and WhatsApp benefit most from short links; X shortens links on its own</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Instagram links only work in your bio, stories, and DMs — not in captions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Preview cards come from the destination page&apos;s Open Graph tags</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Give each channel its own short link so you can compare results</span>
              </li>
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
            <Link prefetch={false} href="/blogs" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              ← Back to Blogs
            </Link>
            <Link prefetch={false} href="/blogs/qr-codes-vs-short-links" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              QR Codes vs Short Links
            </Link>
            <Link prefetch={false} href="/" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              Create a Short Link
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
