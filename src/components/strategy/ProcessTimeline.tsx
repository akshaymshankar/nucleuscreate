import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Lightbulb, Clapperboard, Wand2, Rocket, CheckCircle2, ChevronDown } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Brand Immersion",
    subtitle: "Understanding your economics before touching a single frame.",
    icon: Compass,
    details: [
      "Deep-dive strategy briefing: target audience personas, acquisition channels, and target CPA benchmarks",
      "Comprehensive audit of your top-performing creative, historical winners, and immediate competitor landscape",
      "Honest format blueprint: deciding whether Live-Action, Generative AI, 3D Motion, or Hybrid maximizes ROI",
    ],
    timelineTag: "Day 1 - 2",
  },
  {
    number: "02",
    title: "Creative Strategy & Pre-Production",
    subtitle: "Turning the brief into concrete visual architecture.",
    icon: Lightbulb,
    details: [
      "Hook engineering: scripting 3 to 5 high-converting opening hooks tailored to algorithm retention",
      "Direct response storyboards, aesthetic mood boards, and photorealistic AI prompt seeds",
      "Talent casting, studio booking (if Live-Action) or 3D CAD modeling (if Motion/CGI)",
      "Omnichannel asset map across 9:16 vertical, 1:1 square, and 16:9 widescreen formats",
    ],
    timelineTag: "Day 2 - 4",
  },
  {
    number: "03",
    title: "Production & Generation Engine",
    subtitle: "Flawless physical shoot or high-velocity AI synthesis.",
    icon: Clapperboard,
    details: [
      "Physical shoots executed with dedicated cinema crews, precision lighting, and macro rigs",
      "Generative AI paired with hands-on artist direction for photorealistic texture, physics, and character fidelity",
      "3D CGI modeling, volumetric lighting passes, and particle dynamics rendered in-house",
      "Zero handoff friction - the strategists who wrote the brief direct the production",
    ],
    timelineTag: "Day 4 - 8",
  },
  {
    number: "04",
    title: "Post-Production & Precision Finish",
    subtitle: "Where good footage becomes high-converting commercial art.",
    icon: Wand2,
    details: [
      "Rhythm-driven edit cuts optimized for sub-second audience retention and hook drop-off elimination",
      "DaVinci Resolve color grading & master finishing",
      "Custom sound design, foley work, commercial music licensing, and resonant voiceover tracks",
      "VFX cleanup, graphic callouts, subtitles, and kinetic typography overlays",
    ],
    timelineTag: "Day 8 - 11",
  },
  {
    number: "05",
    title: "Review, Multi-Format Delivery & Scaling",
    subtitle: "Revision rounds until it's perfect, then omnichannel deployment.",
    icon: Rocket,
    details: [
      "Collaborative review links with timestamped frame comments",
      "Comprehensive revision cycles included to ensure 100% brand adherence",
      "Full export suites: TikTok 9:16, Meta 4:5 / 1:1, YouTube 16:9, and lossless archive masters",
      "Ongoing partnership retainers for continuous monthly asset testing and refresh cycles",
    ],
    timelineTag: "Day 12 - 14",
  },
];

export default function ProcessTimeline() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepNumber: string) => {
    setExpandedStep((prev) => (prev === stepNumber ? null : stepNumber));
  };

  return (
    <section id="process" className="relative py-20 sm:py-32 bg-[#100E12] border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            5-Stage Execution Framework
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
            From initial brief to fully produced campaign.
          </h2>

          <p className="mt-4 text-sm sm:text-lg text-white/60 font-body leading-relaxed">
            Not just a vendor queue — we operate as your integrated video engineering department.
            Tap any stage below to inspect our deliverable architecture and timeline.
          </p>
        </div>

        {/* Timeline Steps Accordion */}
        <div className="mt-10 sm:mt-16 space-y-3.5 sm:space-y-4">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isExpanded = expandedStep === step.number;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`relative rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden shadow-xl ${
                  isExpanded
                    ? "bg-[#18151D] border-primary/45 shadow-[0_10px_35px_rgba(37,211,102,0.08)]"
                    : "bg-[#141217] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Clickable Header Box */}
                <button
                  type="button"
                  onClick={() => toggleStep(step.number)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-4 sm:p-6 sm:px-8 flex items-center justify-between gap-3 sm:gap-6 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
                    {/* Step Index Badge */}
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl border flex items-center justify-center font-mono font-black text-base sm:text-xl shrink-0 transition-all duration-300 ${
                        isExpanded
                          ? "bg-primary text-black border-primary shadow-sm"
                          : "bg-primary/10 border-primary/30 text-primary group-hover:bg-primary/20"
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Title & Timeline Meta */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-primary font-semibold flex items-center gap-1">
                          <Icon className="w-3 h-3" />
                          {step.timelineTag}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-white text-base sm:text-xl md:text-2xl leading-snug group-hover:text-primary transition-colors truncate sm:whitespace-normal">
                        {step.title}
                      </h3>
                      <p className="text-xs text-white/50 font-body mt-0.5 line-clamp-1 sm:line-clamp-2">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Expand / Collapse Indicator */}
                  <div className="flex items-center gap-2 shrink-0 pl-1">
                    <span className="hidden md:inline text-[11px] font-mono text-white/40 group-hover:text-primary transition-colors">
                      {isExpanded ? "Collapse" : "Tap to view"}
                    </span>
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isExpanded
                          ? "bg-primary/20 border-primary/50 text-primary"
                          : "bg-white/[0.04] border-white/10 text-white/60 group-hover:text-white group-hover:bg-white/[0.08]"
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Smooth Expandable Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${step.number}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="p-4 sm:p-6 sm:px-8 bg-black/20">
                        <div className="space-y-2.5 sm:space-y-3">
                          {step.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-white/85 font-body leading-relaxed">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
