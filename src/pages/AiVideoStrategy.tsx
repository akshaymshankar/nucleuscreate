import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CtaLink } from "@/components/site/Buttons";
import { DotsBg } from "@/components/site/HeroBackgrounds";
import BrandForm from "@/components/site/BrandForm";
import FinalCta from "@/components/site/FinalCta";
import { HeroLoop, lightPage, PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CardGrid, Checklist, CompareTable, FaqSection, Pills, PricingStrip, StepList } from "@/components/site/ServiceBlocks";
import WorkTabs from "@/components/site/WorkTabs";
import { aiWorkTabs } from "@/data/work";
import usePageMeta from "@/hooks/use-page-meta";
import { BRAND_ENQUIRY_EMAIL, CALENDLY_URL } from "@/lib/site";

// Copy source: "09-landing-page-upgrade-brief.md" (12 Nov 2026).

const formats = [
  { title: "Product ads", text: "Short ads that show the product up close, the problem it solves and the offer. Made for Reels, TikTok and Meta." },
  { title: "Brand films", text: "Longer pieces that set the mood for a brand, a collection or an event, without flying a crew around the world." },
  { title: "Launch and campaign reels", text: "A set of videos for a launch or a sale, in every size you need, ready on the same day." },
  { title: "Explainers", text: "The story behind a product or an ingredient, told clearly in under a minute." },
  { title: "Hybrid videos", text: "Real footage of your product mixed with AI scenes, for shots that would cost too much to film." },
  { title: "3D product shots", text: "Detailed 3D for packaging, jewellery and anything that needs to turn, open or catch the light." },
];

const industries = ["Beauty and haircare", "Fragrance and oud", "Fashion and leather", "Jewellery", "Cars and auto", "Events and weddings", "DTC brands"];

const steps = [
  {
    when: "Day 1 to 2",
    title: "Getting to know your brand",
    text: "We learn the product before we touch a frame.",
    details: [
      "A call about your customer, your product and your goals.",
      "We look at your best videos so far and what your competitors are running.",
      "We suggest the right format: a shoot, AI, 3D or a mix.",
    ],
  },
  {
    when: "Day 2 to 4",
    title: "Scripts and the look",
    text: "The idea, written and drawn out.",
    details: [
      "Scripts with 3 to 5 different openings to test.",
      "Storyboards and mood boards.",
      "Casting and studio booking if we're shooting, 3D models if we need them.",
      "A plan for every size: 9:16, 1:1 and 16:9.",
    ],
  },
  {
    when: "Day 4 to 7",
    title: "Production",
    text: "We shoot it, make it with AI, or both.",
    details: [
      "Shoots with our own crew, lighting and macro lenses.",
      "AI with hands-on art direction, so faces, products and movement stay true.",
      "3D for product detail, done in-house.",
      "The people who wrote the brief direct the work.",
    ],
  },
  {
    when: "Day 7 to 9",
    title: "Edit and finish",
    text: "Where it comes together.",
    details: [
      "Tight edits with a strong opening, so people keep watching.",
      "Colour in DaVinci Resolve.",
      "Sound design, music and voiceover.",
      "Subtitles, on-screen text and clean-up.",
    ],
  },
  {
    when: "Day 9 to 10",
    title: "Review and delivery",
    text: "Changes until it's right, then every file you need.",
    details: [
      "Review links where you comment on the exact frame.",
      "Revision rounds included.",
      "Final files for Reels, TikTok, Meta, YouTube and your website, plus full-quality masters.",
      "Want more every month? We can keep going on a monthly plan.",
    ],
  },
];

const compareRows = [
  { label: "Live-action shoots", values: ["Yes, with our own crew (India)", "No", "Yes"] },
  { label: "AI video", values: ["Yes, with hands-on art direction", "Yes", "Rarely"] },
  { label: "Real footage mixed with AI", values: ["Yes", "No", "Possible, usually with a big VFX budget"] },
  { label: "Speed", values: ["AI in 7 to 10 working days", "Fast", "Often 4 to 8 weeks"] },
  { label: "Budget", values: ["Mix formats to fit your budget", "Low cost, one style", "Higher minimums"] },
  { label: "One point of contact", values: ["One creative lead, start to finish", "Usually", "Often several vendors"] },
  { label: "Made to run as ads", values: ["Strong openings, the right sizes, ready for paid social", "Varies", "Varies"] },
];

const promises = [
  { badge: "On time", title: "We deliver when we say we will", text: "We agree a date with you and stick to it. If anything changes, you hear it from us first." },
  { badge: "Right direction", title: "If it's not right, we rework it", text: "If the first direction doesn't feel right for your brand, we rework it within your revision rounds." },
  {
    badge: "Made for ads",
    title: "Built to run as ads",
    text: "Every video is planned for paid social: a strong opening, a clear product moment and every size you need. If you want, our performance marketer can run the ads for you too.",
  },
  { badge: "One person", title: "One person from start to finish", text: "You talk to one creative lead from the first call to the final file. Never a ticket queue." },
];

const kickoff = [
  "Your logo, fonts, colours and any brand guidelines.",
  "The product itself, or good photos or 3D files of it. Location access if we're shooting.",
  "Ads, videos or films you like the look of.",
  "Your dos and don'ts, and any legal lines we need to include.",
  "Who your customer is and where the videos will run.",
  "What the videos need to do: sell, get views, or build the brand.",
];

const faqs = [
  {
    q: "What kind of videos can you create?",
    a: "Product videos, brand films, ads for social, launch and campaign reels, and explainers. We make them as live-action, AI, 3D or a mix, and suggest what fits your goal and budget.",
  },
  {
    q: "How do you decide between live-action, AI, or motion graphics?",
    a: "On the first call we look at your product, your timeline and what the video needs to show. Some things need real hands and real places. Others are faster and cheaper with AI or 3D. We'll tell you honestly, even if the answer is the cheaper option.",
  },
  {
    q: "How long does delivery take?",
    a: "AI and motion graphics videos take 7 to 10 working days. Shoots and hybrid projects take about 3 weeks, depending on casting and studio dates. We agree the date with you at the start.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes. Every project starts with 3 to 4 revision rounds. You review on a link where you can comment on the exact frame, and we change it until it's right.",
  },
  {
    q: "What formats do I receive?",
    a: "High-quality MP4s and ProRes masters, sized for Reels and TikTok (9:16), Meta feed (4:5 and 1:1), YouTube Shorts and widescreen (16:9) for your website.",
  },
  {
    q: "Do you provide scripts, voiceovers, and sound design?",
    a: "Yes. We write the scripts, record or produce the voiceover, and handle music and sound design. Music is commercially licensed, and we make custom foley when a video needs it.",
  },
  {
    q: "What makes your AI video look real compared to generic AI tools?",
    a: "We don't press one button and hope. Our team sets up the people and the product first, gets your OK on how they look, and only then generates the video. Then it's edited and coloured like any professional production, so it looks made by people who know video.",
  },
  {
    q: "How do I get started?",
    a: "Book a 30 minute call. Tell us about your product and we'll show you work like it, then send a timeline and a quote. No commitment.",
  },
];

export default function AiVideoStrategy() {
  usePageMeta({
    title: "Nucleus Productions | AI video for brands",
    description: "We plan, script and make AI and hybrid videos for brands. See the work and book a 30 minute call.",
    path: "/services/ai-video-strategy",
  });

  return (
    <div className={lightPage}>
      <Navbar />
      <main>
        <PageHero
          background={<DotsBg />}
          eyebrow="AI video, strategy and production"
          title="We don't just make AI videos. We make videos that feel right for your brand."
          description="From the first idea to the final cut. Live-action, AI or a mix of both. One team, one process."
          aside={<HeroLoop src="/work/ai/hero-loop-arka.mp4" poster="/work/ai/hero-loop-arka.jpg" label="Arka Fine Jewels, AI product film" />}
        >
          <CtaLink href={CALENDLY_URL} variant="light">Book a call</CtaLink>
          <CtaLink href="#work" variant="ghostDark">See the work</CtaLink>
        </PageHero>

        <Section id="work">
          <SectionHeading eyebrow="Our work" title="Work we've made for brands" description="Every video here was made by our team for a real brand. Filter by industry." />
          <WorkTabs tabs={aiWorkTabs} />
        </Section>

        <Section id="formats">
          <SectionHeading eyebrow="What we make" title="Ads, films and everything in between" description="We pick the format for the job, not the other way round." />
          <CardGrid items={formats} columns={3} />
          <p className="mt-12 text-sm text-neutral-500">Brands we make videos for</p>
          <Pills items={industries} />
        </Section>

        <Section id="process">
          <SectionHeading eyebrow="How we work" title="From the first call to the final file" description="We work like your in-house video team. Here's what happens, day by day." />
          <StepList steps={steps} note="Shoots and hybrid projects take about 3 weeks." />
        </Section>

        <Section id="compare">
          <SectionHeading
            eyebrow="Why one team"
            title="Why brands use one team for shoots and AI"
            description="AI-only studios are quick but can't film your real product. Production houses look great but take weeks. We do both, so each video gets the right mix."
          />
          <CompareTable columns={["Nucleus", "AI-only studios", "Traditional production"]} rows={compareRows} />
        </Section>

        <Section id="promise">
          <SectionHeading eyebrow="Our promise" title="What you can count on" description="Four things we hold ourselves to on every project." />
          <CardGrid items={promises} />
        </Section>

        <Section id="kickoff">
          <SectionHeading eyebrow="Getting started" title="To get started, we'll ask for:" description="We take it from there." />
          <Checklist items={kickoff} />
        </Section>

        <Section id="about">
          <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <img src="/team/anush.jpg" alt="Anush, founder of Nucleus Productions" width={316} height={395} loading="lazy" decoding="async" className="aspect-[4/5] w-full max-w-[280px] rounded-3xl object-cover" />
            <div className="max-w-2xl">
              <p className="text-sm text-neutral-500">Who we are</p>
              <h2 className="mt-1.5 font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-950 sm:text-[2.6rem]">
                Hi, I'm Anush, founder of Nucleus Productions.
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600">
                <p>We're a small team of editors and AI artists. Over the last two years we've made videos for beauty, fragrance, jewellery, fashion, auto and events brands.</p>
                <p>
                  You talk to me directly, from the first call to the final file. And if you want the videos run as ads, our performance marketer, who has five years of
                  experience, can take that on.
                </p>
              </div>
              <CtaLink href={CALENDLY_URL} variant="dark" className="mt-8">Book a call with me</CtaLink>
            </div>
          </div>
        </Section>

        <FaqSection faqs={faqs} title="Questions brands ask us" description="Formats, timing, revisions and how to start." />

        <PricingStrip title="Pricing depends on the format and the number of videos." />

        <FinalCta
          title="Want to see what we'd make for you?"
          text="Book a call, or tell us what you're making and we'll send a quote."
          form={<BrandForm />}
        />
      </main>
      <Footer line="Working with brands in India, the UAE, the UK and the US." email={BRAND_ENQUIRY_EMAIL} showAgencies={false} />
    </div>
  );
}
