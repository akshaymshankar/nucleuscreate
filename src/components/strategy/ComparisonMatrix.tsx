import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Sparkles, Zap, ShieldAlert, Award, ChevronDown } from "lucide-react";

const matrixRows = [
  {
    capability: "Live-Action Shoots",
    description: "Physical studio sets, real human talent, real-world product lighting",
    nucleus: "Yes (Full in-house crew)",
    aiOnly: "None (Digital/AI only)",
    traditional: "Yes (Core focus)",
  },
  {
    capability: "Generative AI Video",
    description: "Rapid iteration, infinite variations, photorealistic synthetic ads",
    nucleus: "Yes (Generative AI with custom art direction)",
    aiOnly: "Yes (Core focus)",
    traditional: "Rarely offered (Traditional production only)",
  },
  {
    capability: "Hybrid Compositing",
    description: "Live-action physical product composited seamlessly into generative AI environments",
    nucleus: "Yes (Rare cross-disciplinary capability)",
    aiOnly: "Impossible without physical camera crews",
    traditional: "Massive VFX budget required ($30k+)",
  },
  {
    capability: "Delivery Speed",
    description: "Average turnaround from approved script to multi-format delivery",
    nucleus: "⚡ Fast (7-14 days guaranteed)",
    aiOnly: "Fastest (often low fidelity)",
    traditional: "Slow (4-8 weeks typical)",
  },
  {
    capability: "Cost Flexibility",
    description: "Ability to blend formats to match acquisition goals and test budgets",
    nucleus: "Flexible (Mix formats to budget)",
    aiOnly: "Low cost, but rigid single style",
    traditional: "Very high minimums ($15k - $50k+)",
  },
  {
    capability: "Single Point of Contact",
    description: "One unified creative director and account manager across all formats",
    nucleus: "1 Dedicated Team",
    aiOnly: "1 Team",
    traditional: "Multiple fragmented agencies & vendors",
  },
  {
    capability: "Direct-Response Native",
    description: "Hook engineering, retention editing, and vertical social conversion",
    nucleus: "Engineered for CPA & ROAS",
    aiOnly: "Algorithmic generation without strategy",
    traditional: "Aesthetic festival reels, poor conversion",
  },
];

export default function ComparisonMatrix() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="compare" className="relative py-20 sm:py-32 bg-[#0B0A0D] border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/25 mb-4">
            <Award className="w-3.5 h-3.5" />
            Competitive Breakdown
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
            Why brands choose a full-scope team over single-format shops.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-body leading-relaxed">
            DIY AI tools and pure-AI studios are fast, but lack physical authenticity.
            Traditional production houses look great, but move at a snail's pace and drain ad spend.
            Here is where the trade-offs actually land.
          </p>
        </div>

        {/* Mobile View: Minimized Tap-to-Reveal Accordion (Hidden on desktop) */}
        <div className="mt-8 space-y-2.5 lg:hidden">
          <div className="text-center pb-1">
            <span className="text-[10px] sm:text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
              Tap any capability to reveal comparison breakdown ↓
            </span>
          </div>

          {matrixRows.map((row, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "bg-[#18151D] border-primary/45 shadow-[0_8px_25px_rgba(37,211,102,0.1)]"
                    : "bg-[#141217] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Header Row (Always visible, clean & compact) */}
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                        isExpanded
                          ? "bg-primary text-black"
                          : "bg-white/[0.06] text-primary border border-white/10"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug truncate">
                        {row.capability}
                      </h3>
                      <span className="text-[10px] font-mono text-primary/80 font-semibold block truncate">
                        Nucleus: {row.nucleus.split("(")[0].trim()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isExpanded
                          ? "bg-primary/20 border-primary/40 text-primary"
                          : "bg-white/[0.04] border-white/10 text-white/40"
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Reveal Content (Smooth expansion on tap) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="p-4 pt-3 bg-black/25 space-y-3">
                        <p className="text-xs text-white/60 font-body leading-relaxed">
                          {row.description}
                        </p>

                        {/* Nucleus Box */}
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-primary text-black flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider block">
                              NUCLEUS PRODUCTIONS
                            </span>
                            <span className="text-xs font-heading font-bold text-white leading-snug">
                              {row.nucleus}
                            </span>
                          </div>
                        </div>

                        {/* Competitor Boxes Side-by-side */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-[9px] font-mono uppercase text-white/40 block mb-0.5">
                              AI-Only Studios
                            </span>
                            <span className="text-white/60 font-body text-[11px] leading-tight block">
                              {row.aiOnly}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-[9px] font-mono uppercase text-white/40 block mb-0.5">
                              Traditional Houses
                            </span>
                            <span className="text-white/60 font-body text-[11px] leading-tight block">
                              {row.traditional}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Wide Apple Comparison Table (Hidden on mobile) */}
        <div className="mt-14 hidden lg:block overflow-x-auto rounded-3xl border border-white/10 bg-[#121015]/90 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider">
                <th className="p-5 sm:p-6 text-white/40 font-semibold w-1/4">Key Capability</th>
                <th className="p-5 sm:p-6 bg-primary/10 text-primary font-bold border-x border-primary/20 w-1/3 relative">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-heading font-black text-white">Nucleus Productions</span>
                    <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-primary text-black font-extrabold uppercase shadow-sm">
                      Recommended
                    </span>
                  </div>
                </th>
                <th className="p-5 sm:p-6 text-white/60 font-semibold w-1/5">AI-Only Studios</th>
                <th className="p-5 sm:p-6 text-white/60 font-semibold w-1/5">Traditional Houses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-body">
              {matrixRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  {/* Capability name */}
                  <td className="p-5 sm:p-6">
                    <div className="font-heading font-bold text-white text-base">{row.capability}</div>
                    <div className="text-xs text-white/45 mt-0.5">{row.description}</div>
                  </td>

                  {/* Nucleus Productions (Hero Column) */}
                  <td className="p-5 sm:p-6 bg-primary/[0.06] border-x border-primary/20">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary text-black flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{row.nucleus}</span>
                    </div>
                  </td>

                  {/* AI-Only Studios */}
                  <td className="p-5 sm:p-6 text-white/60 text-xs sm:text-sm">
                    {row.aiOnly.startsWith("None") || row.aiOnly.startsWith("Impossible") ? (
                      <span className="text-white/30 flex items-center gap-1.5">
                        <Minus className="w-3.5 h-3.5" />
                        {row.aiOnly}
                      </span>
                    ) : (
                      <span>{row.aiOnly}</span>
                    )}
                  </td>

                  {/* Traditional Houses */}
                  <td className="p-5 sm:p-6 text-white/60 text-xs sm:text-sm">
                    {row.traditional.startsWith("None") || row.traditional.startsWith("Slow") ? (
                      <span className="text-white/30 flex items-center gap-1.5">
                        <Minus className="w-3.5 h-3.5" />
                        {row.traditional}
                      </span>
                    ) : (
                      <span>{row.traditional}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
