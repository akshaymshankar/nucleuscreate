import { ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { CtaLink } from "./Buttons";
import LiteYouTube from "./LiteYouTube";
import { framed } from "./Section";

// The homepage also shows a short card linking to the Breaking Money case study page.
export default function CaseStudies({ showBreakingMoney = false }: { showBreakingMoney?: boolean }) {
  const ready = caseStudies.filter((c) => c.stats.length > 0);
  if (ready.length === 0) return null;

  return (
    <section id="results" className="scroll-mt-16">
      <div className={`${framed} space-y-20 py-20 sm:py-28`}>
        {ready.map((c, i) => (
          <article key={c.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <p className="flex items-center gap-1.5 text-sm font-medium text-[#178a3c]">
                <Award className="h-4 w-4" /> {c.client} case study
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.02em] text-neutral-950 sm:text-3xl">{c.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-neutral-600">{c.summary}</p>
              <CtaLink href={`https://www.youtube.com/watch?v=${c.youtubeId}`} variant="soft" className="mt-6">
                Watch on YouTube
              </CtaLink>
              <dl className="mt-8 grid grid-cols-3 overflow-hidden rounded-xl border border-black/[0.08] bg-white">
                {c.stats.map((s, j) => (
                  <div key={s.label} className={`p-4 ${j ? "border-l border-black/[0.08]" : ""}`}>
                    <dt className="text-xs text-neutral-500">{s.label}</dt>
                    <dd className="mt-1 whitespace-nowrap font-heading text-lg font-semibold text-neutral-950 sm:text-xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl bg-black/[0.04] p-4 sm:p-8">
              <LiteYouTube youtubeId={c.youtubeId} title={`${c.client}: ${c.title}`} className="shadow-xl" />
            </div>
          </article>
        ))}
        {showBreakingMoney && <BreakingMoneyCard />}
      </div>
    </section>
  );
}

const bmStats = [
  { value: "13.7M", label: "Instagram views, last 90 days" },
  { value: "+39.7K", label: "followers, last 90 days" },
  { value: "2+", label: "reels a day, shot and edited by us" },
];

function BreakingMoneyCard() {
  return (
    <Link to="/case-studies/breaking-money" className="group grid items-center gap-8 overflow-hidden rounded-3xl bg-neutral-950 p-6 text-white sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <div>
        <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
          <Award className="h-4 w-4" /> Breaking Money case study
        </p>
        <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">0 to 100K followers in under 6 months</h3>
        <p className="mt-3 max-w-md leading-relaxed text-white/60">Daily short-form for a finance explainer brand, launched 19 May 2026. Shot and edited by our team.</p>
        <ul className="mt-8 grid grid-cols-3 gap-4">
          {bmStats.map((s) => (
            <li key={s.label}>
              <p className="font-heading text-xl font-semibold sm:text-2xl">{s.value}</p>
              <p className="mt-1 text-xs leading-snug text-white/50">{s.label}</p>
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
          Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <img src="/work/breaking-money/irctc-tatkal.jpg" alt="" width={720} height={900} loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-2xl object-cover" />
        <img src="/work/breaking-money/bitcoin-ep1.jpg" alt="" width={720} height={900} loading="lazy" decoding="async" className="mt-8 aspect-[4/5] w-full rounded-2xl object-cover" />
      </div>
    </Link>
  );
}
