import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CtaLink } from "@/components/site/Buttons";
import { container, lightPage, PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CardGrid } from "@/components/site/ServiceBlocks";
import usePageMeta from "@/hooks/use-page-meta";
import { CALENDLY_URL } from "@/lib/site";

// Breaking Money case study. Source: "case-study-breaking-money-prompt.md" (20 Nov 2026).
// Every number on this page comes from that brief, and each one carries its time window.

const tiles = [
  { value: "13.7M", label: "Instagram views", window: "Last 90 days" },
  { value: "+39.7K", label: "net new Instagram followers", window: "Last 90 days" },
  { value: "4.6 lakh", label: "shares on one post (460,000)", window: "Last 180 days" },
  { value: "327K", label: "monthly YouTube audience", window: "Last 28 days, up from about 110K" },
];

const instagram = [
  { value: "13.7 million", label: "views" },
  { value: "3.67 million", label: "unique viewers" },
  { value: "+39,707", label: "net new followers" },
  { value: "About 1 crore", label: "of those views came from Reels (1 crore is 10 million)" },
];

const youtube = [
  { value: "670,900", label: "views" },
  { value: "110K to 327K", label: "monthly audience, in four weeks" },
  { value: "92%", label: "of viewers were new to the channel" },
  { value: "293,500", label: "views on the top video, “₹5,000 for Your Child”" },
];

const services = [
  { title: "Shooting", text: "Our team films the creators for the daily reels and the long-form videos." },
  { title: "Editing", text: "Every piece is cut by our editors, with Anush overseeing each one." },
  { title: "Hooks and on-screen text", text: "The opening line and the text on screen, built to stop the scroll in the first second." },
  { title: "Thumbnails and covers", text: "Covers for reels and carousels, and thumbnails for YouTube." },
  { title: "2+ reels a day", text: "Daily short-form for Instagram, YouTube and Facebook, every day." },
  { title: "Long-form YouTube", text: "Longer explainers for the YouTube channel, alongside the daily reels." },
];

const lessons = [
  {
    title: "Win the first second",
    text: "Hooks built on a strong contrast or a surprise, like “IRCTC Tatkal is a scam.” The viewer has to know what's at stake before they can scroll away.",
  },
  {
    title: "Make it worth sending",
    text: "Explainers people forward to friends and family. Shares, not just likes, drove the growth: one post was shared 4.6 lakh times (last 180 days).",
  },
  {
    title: "Give people a reason to come back",
    text: "Series like the Bitcoin series give viewers a reason to follow for the next episode. Episode 1 alone brought 13,000 new followers (last 180 days).",
  },
];

type Piece = { kind: "Reel" | "Post"; image: string; title: string; stats: string[]; point: string };

const pieces: Piece[] = [
  {
    kind: "Reel",
    image: "/work/breaking-money/bitcoin-ep1.jpg",
    title: "“We mined 62 crore worth of BTC”, Bitcoin series, episode 1",
    stats: ["1.1M views", "44K likes", "13,000 new followers"],
    point: "A series opener that turned viewers into followers.",
  },
  {
    kind: "Reel",
    image: "/work/breaking-money/trading-day6.jpg",
    title: "“₹1 lakh to ₹10 lakh”, a daily challenge series (day 6 shown)",
    stats: ["Day 1: 2,900 new followers", "Day 1: 2,400 comments", "New episode every day"],
    point: "A daily episodic format that keeps people coming back and commenting.",
  },
  {
    kind: "Post",
    image: "/work/breaking-money/irctc-tatkal.jpg",
    title: "“IRCTC Tatkal is a scam” carousel",
    stats: ["9M views", "1.9 lakh likes (190,000)", "4.6 lakh shares (460,000)", "29,000 new followers"],
    point: "A contrarian hook, “is a scam, but only if you don't know how it works”, that people forwarded to family.",
  },
  {
    kind: "Post",
    image: "/work/breaking-money/tneb-bill.jpg",
    title: "“Don't pay your next TNEB bill without understanding this” carousel",
    stats: ["9.9 lakh views (990,000)", "79,000 shares", "4,900 new followers"],
    point: "A regional, practical explainer with a very high share rate.",
  },
];

function StatList({ title, window, items }: { title: string; window: string; items: { value: string; label: string }[] }) {
  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-8">
      <h3 className="font-heading text-xl font-semibold tracking-tight text-neutral-950">{title}</h3>
      <p className="mt-1 text-sm text-neutral-500">{window}</p>
      <dl className="mt-6 divide-y divide-black/[0.06]">
        {items.map((s) => (
          <div key={s.label} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="text-[15px] text-neutral-600">{s.label}</dt>
            <dd className="shrink-0 font-heading text-lg font-semibold text-neutral-950">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function BreakingMoney() {
  usePageMeta({
    title: "Breaking Money case study: 0 to 100K followers in under 6 months | Nucleus",
    description: "13.7M Instagram views in the last 90 days, on daily short-form video shot and edited by the Nucleus team.",
    path: "/case-studies/breaking-money",
  });

  return (
    <div className={lightPage}>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Case study"
          title="Breaking Money: 0 to 100K followers in under 6 months"
          description="Launched 19 May 2026. 13.7M views in the last 90 days, on daily short-form video shot and edited by our team."
        >
          <CtaLink href={CALENDLY_URL} variant="light">Book a call</CtaLink>
          <CtaLink href="#top-pieces" variant="ghostDark">See the top pieces</CtaLink>
        </PageHero>

        <Section id="numbers">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((t) => (
              <li key={t.label} className="rounded-2xl border border-black/[0.08] bg-white p-6">
                <p className="font-heading text-4xl font-semibold tracking-[-0.02em] text-neutral-950">{t.value}</p>
                <p className="mt-2 text-[15px] leading-snug text-neutral-700">{t.label}</p>
                <p className="mt-3 text-xs font-medium text-[#178a3c]">{t.window}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Breaking Money (@its.breaking.money) is a finance and money explainer channel on Instagram, YouTube and Facebook, run by two creators. Our team handles
            scripting support, shooting and editing, and Anush oversees every piece. It passed 100,000 Instagram followers on 5 Nov 2026, under 6 months after launch,
            and is now at 110K+ (20 Nov 2026).
          </p>
        </Section>

        <Section id="what-we-do">
          <SectionHeading eyebrow="What we do for them" title="Everything after the idea, every day." />
          <CardGrid items={services} columns={3} />
        </Section>

        <Section id="what-worked">
          <SectionHeading eyebrow="What worked" title="Three lessons we bring to every brand." />
          <ol className="mt-10 grid gap-3 lg:grid-cols-3">
            {lessons.map((l, i) => (
              <li key={l.title} className="rounded-2xl border border-black/[0.08] bg-white p-6">
                <span className="font-heading text-sm font-semibold text-[#178a3c]">0{i + 1}</span>
                <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-neutral-950">{l.title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">{l.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="top-pieces">
          <SectionHeading eyebrow="Top pieces" title="Four pieces that moved the numbers." description="Instagram, last 180 days." />
          <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
            {pieces.map((p) => (
              <li key={p.image} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
                <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
                  <img src={p.image} alt={p.title} width={720} height={900} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-neutral-950">{p.kind}</span>
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold leading-snug text-neutral-950">{p.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stats.map((s) => (
                    <li key={s} className="rounded-full bg-[#178a3c]/10 px-2.5 py-1 text-xs font-medium text-[#178a3c]">{s}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{p.point}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="channels">
          <SectionHeading eyebrow="By channel" title="Instagram and YouTube, side by side." />
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            <StatList title="Instagram" window="Last 90 days, 21 Aug to 18 Nov 2026" items={instagram} />
            <StatList title="YouTube" window="Last 28 days, to 18 Nov 2026" items={youtube} />
          </div>
        </Section>

        <Section id="brands">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-black/[0.08] bg-white p-6 sm:flex-row sm:items-center sm:p-8">
            <p className="text-sm text-neutral-500">Brand partner</p>
            <p className="font-heading text-2xl font-semibold tracking-tight text-neutral-950">Policybazaar</p>
            <p className="text-sm text-neutral-600">Paid collaboration</p>
          </div>
        </Section>

        <section className="bg-[#050505] text-white">
          <div className={`${container} py-24 text-center sm:py-32`}>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl">
              Need ad creatives that people actually watch? Let's talk.
            </h2>
            <CtaLink href={CALENDLY_URL} variant="light" className="mt-10">Book a call</CtaLink>
          </div>
        </section>
      </main>
      <Footer hideServices={["/services/ai-video-strategy"]} />
    </div>
  );
}
