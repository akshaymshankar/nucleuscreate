import { useState } from "react";
import { ShieldCheck, Clock, RefreshCw, Users, FileCheck, Palette, Camera, FileText, Target, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const guarantees = [
  {
    icon: Clock,
    title: "Guaranteed On-Time Delivery",
    description:
      "Whatever format you choose - live-action, generative AI, or 3D motion graphics - your project ships strictly on the agreed date. No vendor delays, no moving goalposts.",
    badge: "100% SLA Guarantee",
  },
  {
    icon: RefreshCw,
    title: "Right-Format Outcome Guarantee",
    description:
      "If our recommended format does not align with your performance baseline, we iterate and re-approach the creative angle at zero additional creative fee. We match format to outcome, not vendor bias.",
    badge: "Risk-Free Alignment",
  },
  {
    icon: Target,
    title: "Performance-Driven Strategy",
    description:
      "Every video is built with performance marketing in mind, not just visuals. Hooks, retention, and conversion are baked into the edit from day one, not bolted on after.",
    badge: "Engineered For Growth",
  },
  {
    icon: Users,
    title: "Dedicated Strategic Squad",
    description:
      "Direct communication channel and dedicated creative lead from initial kickoff call to final delivery. A senior creative partner in your corner, never a faceless ticket queue.",
    badge: "Executive Attention",
  },
];

const onboardingInputs = [
  {
    icon: Palette,
    title: "Brand Assets & Identity",
    description: "Vector logo files, typography fonts, color palettes, and existing brand guidelines.",
  },
  {
    icon: Camera,
    title: "Product Samples or Location Access",
    description: "Physical product samples or high-res CAD files for AI/CGI work; venue access if shooting live-action.",
  },
  {
    icon: FileText,
    title: "Creative Moodboard & Style References",
    description: "Competitor ads, TikToks, or film references that resonate with your visual ambition.",
  },
  {
    icon: FileCheck,
    title: "Tone & Messaging Guardrails",
    description: "Strict dos and don'ts, regulatory disclosures, and desired brand voice articulation.",
  },
  {
    icon: Target,
    title: "Target Demographic & Placements",
    description: "Customer avatars, pain points, and specific ad placements (Meta Reels, TikTok, YouTube, TVC).",
  },
  {
    icon: TrendingUp,
    title: "Direct Response Commercial Goals",
    description: "Primary objective: whether optimizing for acquisition CPA, viral watch-time, or prestige brand equity.",
  },
];

export default function GuaranteeSection() {
  const [expandedGuarantee, setExpandedGuarantee] = useState<number | null>(null);

  const toggleGuarantee = (idx: number) => {
    setExpandedGuarantee((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="guarantee" className="relative py-20 sm:py-32 bg-[#100E12] border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Part 1: Guarantees Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/25 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Our Standard
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
            The Nucleus Triple Guarantee.
          </h2>

          <p className="mt-4 text-sm sm:text-lg text-white/60 font-body leading-relaxed">
            Eliminating agency risk with concrete commitments. We back our creative execution with clear guarantees that traditional production houses refuse to make.
            Tap any guarantee below to inspect the terms.
          </p>
        </div>

        {/* Part 1: Guarantees Grid - Expandable on tap */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
          {guarantees.map((g, idx) => {
            const Icon = g.icon;
            const isExpanded = expandedGuarantee === idx;

            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden group shadow-xl ${
                  isExpanded
                    ? "bg-[#18151D] border-primary/45 shadow-[0_10px_30px_rgba(37,211,102,0.08)]"
                    : "bg-[#141217] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Clickable Title Box Header */}
                <button
                  type="button"
                  onClick={() => toggleGuarantee(idx)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4 w-full">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? "bg-primary text-black border-primary shadow-sm"
                          : "bg-primary/10 border-primary/30 text-primary group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                        {g.badge}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                          isExpanded
                            ? "bg-primary/20 border-primary/50 text-primary"
                            : "bg-white/[0.04] border-white/10 text-white/50 group-hover:text-white"
                        }`}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug group-hover:text-primary transition-colors">
                    {g.title}
                  </h3>

                  {!isExpanded && (
                    <span className="text-[11px] font-mono text-white/40 mt-2 flex items-center gap-1 group-hover:text-primary transition-colors">
                      Tap to view commitment details →
                    </span>
                  )}
                </button>

                {/* Smooth Expandable Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`guarantee-body-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="p-5 sm:p-6 pt-3 bg-black/20">
                        <p className="text-xs sm:text-sm text-white/75 font-body leading-relaxed">
                          {g.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>Contractually Enforced</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Part 2: Onboarding Requirements */}
        <div id="onboarding" className="mt-24 pt-20 border-t border-white/10">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-2">
              Smooth Kickoff
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              What we need from you to begin.
            </h3>
            <p className="text-sm sm:text-base text-white/60 mt-2 font-body">
              Provide these assets during onboarding and our creative engine handles everything from there.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {onboardingInputs.map((item, idx) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#141217] border border-white/5 hover:border-primary/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/60 mt-2 font-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    Phase {idx + 1} Input
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
