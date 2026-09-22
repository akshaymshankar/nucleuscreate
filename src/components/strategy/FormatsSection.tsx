import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Cpu, Clapperboard, Sparkles, Check, ArrowRight, Layers } from "lucide-react";

const formats = [
  {
    id: "live",
    number: "01",
    name: "Live-Action Production",
    tag: "Full Crew & Sets",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    icon: Camera,
    headline: "Real people, tactile product, real-world resonance.",
    summary:
      "Full pre-production to post — concept, scripting, talent casting, studio/location shoot, high-end cinema color grading, and commercial editing. For when your brand needs authentic emotional human connection that AI cannot replicate.",
    deliverables: [
      "Cinema-grade 4K/6K camera packages & lighting",
      "Actor casting, location scouting & set styling",
      "Multi-angle product cinematography & macro lenses",
      "Bespoke sound design & licensed commercial score",
    ],
    idealFor: "Hero brand launches, luxury e-commerce, physical lifestyle showcases, and TVC/broadband placements.",
    turnaround: "10–20 days depending on shoot schedule",
  },
  {
    id: "ai",
    number: "02",
    name: "AI-Generated Video",
    tag: "Fast + Infinite Scale",
    tagColor: "text-[#f2542d] border-[#f2542d]/30 bg-[#f2542d]/10",
    icon: Cpu,
    headline: "Maximum velocity, fractional cost, 20x variations for paid media.",
    summary:
      "Rapid turnaround, radically lower cost per asset, and infinite visual variations for high-velocity paid social testing. Ideal for DTC product ads, localized UGC-style hooks, seasonal creative refreshes, and rapid iteration at scale.",
    deliverables: [
      "Photorealistic AI product interaction models",
      "Dynamic vertical hooks engineered for sub-3-second retention",
      "Infinite aspect ratio reformatting (9:16, 1:1, 16:9)",
      "Multi-lingual lip-sync and localized voice synthesis",
    ],
    idealFor: "Meta/TikTok paid performance campaigns, product teasers, high-frequency UGC, and budget-conscious scale.",
    turnaround: "5–10 business days",
  },
  {
    id: "motion",
    number: "03",
    name: "Motion Graphics & CGI",
    tag: "3D & Kinetic Animation",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    icon: Clapperboard,
    headline: "Sleek 3D product renders and kinetic typography without cameras.",
    summary:
      "Animated technical explainers, photorealistic 3D CAD product exploded views, and kinetic typographic masterpieces. For brands that require precision engineering and high-gloss polish without logistical physical shoot constraints.",
    deliverables: [
      "3D product modeling, texturing, and realistic physics simulations",
      "Exploded view component diagrams & feature highlights",
      "Kinetic typography, UI micro-interactions, and logo animations",
      "Vector & raster 2D/3D mixed-media motion systems",
    ],
    idealFor: "SaaS platforms, consumer electronics, complex mechanism demonstrations, and corporate showreels.",
    turnaround: "7–14 business days",
  },
  {
    id: "hybrid",
    number: "04",
    name: "Hybrid Compositing",
    tag: "Best of Both Worlds",
    tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    icon: Layers,
    headline: "Live-action physical product embedded seamlessly in augmented AI realms.",
    summary:
      "Live-action hero footage composited with generative AI environments and 3D CGI visual effects in a single seamless workflow — real product tactile fidelity surrounded by surreal, captivating visual environments that no traditional set could ever afford.",
    deliverables: [
      "Live actor/product chroma keying & camera tracking",
      "Generative AI background synthesis with matched perspective",
      "3D CGI visual effects, fluid particles & lighting integration",
      "Cinema-grade matte painting and composite finishing",
    ],
    idealFor: "Luxury cosmetics, automotive, surreal storytelling, and show-stopping awareness campaigns.",
    turnaround: "10–14 business days",
  },
];

export default function FormatsSection() {
  const [activeFormatId, setActiveFormatId] = useState("ai");
  const activeFormat = formats.find((f) => f.id === activeFormatId) || formats[1];

  return (
    <section id="formats" className="relative py-24 sm:py-32 bg-[#100E12] border-b border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#f2542d]/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#f2542d] bg-[#f2542d]/10 border border-[#f2542d]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format Versatility</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
            One team. Every format your brand actually needs.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 font-body leading-relaxed">
            Most shops force you to pick a lane — AI-only, or an expensive traditional production house.
            We run all four under one roof, and tell you honestly which format serves your outcome and budget best.
          </p>
        </div>

        {/* Formats Grid / Selector */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Format List */}
          <div className="lg:col-span-5 space-y-3">
            {formats.map((fmt) => {
              const isSelected = fmt.id === activeFormatId;
              const Icon = fmt.icon;

              return (
                <div
                  key={fmt.id}
                  onClick={() => setActiveFormatId(fmt.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group ${
                    isSelected
                      ? "bg-[#17141A] border-[#f2542d]/50 shadow-[0_10px_30px_rgba(242,84,45,0.15)]"
                      : "bg-[#121015]/60 border-white/5 hover:border-white/20 hover:bg-[#17141A]/60"
                  }`}
                >
                  {/* Left accent bar if selected */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeFormatIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f2542d]"
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? "bg-[#f2542d]/20 text-[#f2542d] border-[#f2542d]/40"
                            : "bg-white/5 text-white/60 border-white/10 group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-white/40 font-bold">{fmt.number}</span>
                          <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                            {fmt.name}
                          </h3>
                        </div>
                        <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed">
                          {fmt.headline}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border whitespace-nowrap hidden sm:inline-block ${fmt.tagColor}`}
                    >
                      {fmt.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Inspector Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFormat.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#17141A] border border-white/15 relative overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subtle Glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#f2542d]/10 blur-[100px] pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black font-mono text-[#f2542d]">{activeFormat.number}</span>
                    <h4 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      {activeFormat.name}
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border ${activeFormat.tagColor}`}
                  >
                    {activeFormat.tag}
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">Scope Overview</h5>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed font-body">
                      {activeFormat.summary}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">Core Deliverables</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeFormat.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <Check className="w-4 h-4 text-[#f2542d] shrink-0 mt-0.5" />
                          <span className="text-xs text-white/85 leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">Best Suited For</span>
                      <span className="text-xs text-white/85 font-medium mt-1 block leading-relaxed">
                        {activeFormat.idealFor}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">Turnaround Window</span>
                      <span className="text-xs text-[#f2542d] font-mono font-bold mt-1 block">
                        ⚡ {activeFormat.turnaround}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs text-white/50 font-mono">Unsure which fits your campaign?</span>
                    <a
                      href="#book"
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#f2542d] hover:text-white transition-colors uppercase tracking-wider"
                    >
                      <span>Ask our Strategist</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
