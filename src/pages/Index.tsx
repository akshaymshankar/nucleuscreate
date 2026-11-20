import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaLink } from "@/components/site/Buttons";
import PodcastAnim from "@/components/site/anim/PodcastAnim";
import CaseStudies from "@/components/site/CaseStudies";
import FinalCta from "@/components/site/FinalCta";
import LogoMarquee from "@/components/site/LogoMarquee";
import ProcessSteps from "@/components/site/ProcessSteps";
import { container, lightPage, Section, SectionHeading } from "@/components/site/Section";
import WaveBackground from "@/components/site/WaveBackground";
import WorkTabs from "@/components/site/WorkTabs";
import { services, type Service } from "@/data/services";
import { homeWorkTabs } from "@/data/work";
import usePageMeta from "@/hooks/use-page-meta";
import { CALENDLY_URL, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

const numbers = [
  { value: "200+", label: "brands and agencies" },
  { value: "3-day", label: "turnaround on full episodes" },
  { value: "5-person", label: "editing team" },
  { value: "US and UK", label: "hours" },
];

const faqs = [
  {
    q: "Can we hire you for just one service?",
    a: "Yes. Each service runs on its own, so you can start with podcast editing, motion graphics, AI video or clipping and add another whenever you need it.",
  },
  {
    q: "How fast is the turnaround?",
    a: "3 days for full podcast episodes and 48 hours for clips, from the moment we have your raw files. Motion graphics and AI video run on a schedule we agree on the call.",
  },
  {
    q: "What do you need from us?",
    a: "Your recordings or footage in a shared folder, plus any brand assets and notes on how you want it to feel. We take it from there.",
  },
  { q: "How do revisions work?", a: "You review each edit in one round. Send your notes together, we make the changes, and you publish." },
  {
    q: "Do you work with agencies?",
    a: "Yes, white-label. We work behind your agency, your clients only ever deal with you, and the same editors stay on your account every time.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the service, volume and format. Book a 15-minute call and we'll quote within 24 hours, or start with a free sample.",
  },
];

// Animated visuals per service. Services without one yet show their still image in the same panel.
const visuals: Record<string, ReactNode> = {
  "/podcasts": <PodcastAnim />,
};

function ServiceCard({ service }: { service: Service }) {
  const visual = visuals[service.to];
  return (
    <Link to={service.to} className="group flex flex-col rounded-3xl border border-black/[0.08] bg-white p-2.5 transition-colors hover:border-black/20">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-[#F3F3F3]">
        {visual ? (
          <div className="w-full max-w-[460px] px-4">{visual}</div>
        ) : (
          <img src={service.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        )}
      </div>
      <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">{service.title}</h3>
          <p className="mt-1.5 max-w-md leading-relaxed text-neutral-600">{service.text}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.05] transition-colors group-hover:bg-neutral-950 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function Index() {
  usePageMeta({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: "/" });

  return (
    <div className={lightPage}>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#050505] text-white">
          <WaveBackground />
          {/* Vignette: darkens the edges and fades into the next section. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_30%,#050505_85%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#050505]" />
          <div className={`${container} relative flex min-h-[92svh] flex-col pb-10 pt-36 sm:pt-44`}>
            <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center text-center">
              <h1 className="font-heading text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
                The video studio behind ambitious brands and podcasts.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Podcast editing, motion graphics, AI video and clipping. One fixed team, working US and UK hours.
              </p>
              <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <CtaLink href={CALENDLY_URL} variant="light">Book a call</CtaLink>
                <CtaLink href="#work" variant="ghostDark">See our work</CtaLink>
              </div>
            </div>
            <div className="mt-20">
              <p className="mb-6 text-center text-sm text-white/45">Trusted by 200+ brands and agencies</p>
              <LogoMarquee />
            </div>
          </div>
        </section>

        <Section id="services">
          <SectionHeading
            eyebrow="What we do"
            title="Four services. One studio."
            description="Pick the one you need, or combine them. Each has its own page with samples."
          >
            <CtaLink href={CALENDLY_URL} variant="soft" className="self-start sm:self-auto">Book a call</CtaLink>
          </SectionHeading>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {services.map((s) => (
              <ServiceCard key={s.to} service={s} />
            ))}
          </div>
          <Link
            to="/agencies"
            className="group mt-3 flex flex-col justify-between gap-3 rounded-3xl border border-black/[0.08] bg-white p-6 transition-colors hover:border-black/20 sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-tight">For agencies</h3>
              <p className="mt-1 text-neutral-600">
                All four services, white-label. The same editors every time, never client-facing.
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Section>

        <Section id="work">
          <SectionHeading eyebrow="Selected work" title="See it before you book it." description="A few picks from each service. Press play on anything below." />
          <WorkTabs tabs={homeWorkTabs} />
        </Section>

        <CaseStudies showBreakingMoney />

        <Section id="how">
          <SectionHeading eyebrow="How it works" title="Three steps. No back and forth." />
          <ProcessSteps />
        </Section>

        <section aria-label="By the numbers" className="bg-[#050505] text-white">
          <div className={`${container} py-24 text-center sm:py-32`}>
            <h2 className="mx-auto max-w-md font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]">Our work, by the numbers.</h2>
            <dl className="mt-14 grid grid-cols-2 gap-y-12 md:grid-cols-4 md:divide-x md:divide-dashed md:divide-white/15">
              {numbers.map((n) => (
                <div key={n.label} className="px-4">
                  <dd className="font-heading text-3xl font-semibold tracking-tight sm:text-5xl">{n.value}</dd>
                  <dt className="mt-2 text-sm text-white/55">{n.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section id="faq" narrow>
          <SectionHeading title="FAQs" align="center" />
          <Accordion type="single" collapsible className="mt-10 space-y-2">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="rounded-xl border-0 bg-black/[0.04] px-5">
                <AccordionTrigger className="py-4 text-left text-[15px] font-medium text-neutral-950 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-[15px] leading-relaxed text-neutral-600">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <FinalCta title="Send us one video. We'll show you what it can become." />
      </main>
      <Footer />
    </div>
  );
}
