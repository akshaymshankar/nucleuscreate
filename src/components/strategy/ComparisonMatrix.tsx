import { motion } from "framer-motion";
import { Check, Minus, Sparkles, Zap, ShieldAlert, Award } from "lucide-react";

const matrixRows = [
  {
    capability: "Live-Action Shoots",
    description: "Physical studio sets, real human talent, real-world product lighting",
    nucleus: "Yes (Full in-house crew)",
    aiOnly: "None (AI hallucinations only)",
    traditional: "Yes (Core focus)",
  },
  {
    capability: "Generative AI Video",
    description: "Rapid iteration, infinite variations, photorealistic synthetic ads",
    nucleus: "Yes (Proprietary multi-model pipeline)",
    aiOnly: "Yes (Core focus)",
    traditional: "None (Outdated aversion)",
  },
  {
    capability: "3D Motion Graphics & CGI",
    description: "Photorealistic CAD models, exploded mechanical views, kinetic typography",
    nucleus: "Yes (In-house 3D team)",
    aiOnly: "Very Limited / Basic templates",
    traditional: "Requires expensive 3rd-party subcontractor",
  },
  {
    capability: "Hybrid Compositing",
    description: "Live-action physical product composited into generative AI & 3D worlds",
    nucleus: "Yes (Rare cross-disciplinary capability)",
    aiOnly: "Impossible without physical camera crews",
    traditional: "Massive VFX budget required ($30k+)",
  },
  {
    capability: "Delivery Speed",
    description: "Average turnaround from approved script to multi-format delivery",
    nucleus: "⚡ Fast (7–14 days guaranteed)",
    aiOnly: "Fastest (often low fidelity)",
    traditional: "Slow (4–8 weeks typical)",
  },
  {
    capability: "Cost Flexibility",
    description: "Ability to blend formats to match acquisition goals and test budgets",
    nucleus: "Flexible (Mix formats to budget)",
    aiOnly: "Low cost, but rigid single style",
    traditional: "Very high minimums ($15k – $50k+)",
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
  return (
    <section id="compare" className="relative py-24 sm:py-32 bg-[#0B0A0D] border-b border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#f2542d]/5 blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#f2542d] bg-[#f2542d]/10 border border-[#f2542d]/25 mb-4">
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

        {/* Comparison Table Wrap */}
        <div className="mt-14 overflow-x-auto rounded-3xl border border-white/10 bg-[#121015]/90 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider">
                <th className="p-5 sm:p-6 text-white/40 font-semibold w-1/4">Key Capability</th>
                <th className="p-5 sm:p-6 bg-[#f2542d]/10 text-[#f2542d] font-bold border-x border-[#f2542d]/20 w-1/3 relative">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#f2542d]" />
                    <span className="text-sm font-heading font-black text-white">Nucleus Productions</span>
                    <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-[#f2542d] text-black font-extrabold uppercase">
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
                  <td className="p-5 sm:p-6 bg-[#f2542d]/[0.06] border-x border-[#f2542d]/20">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#f2542d] text-black flex items-center justify-center shrink-0">
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
