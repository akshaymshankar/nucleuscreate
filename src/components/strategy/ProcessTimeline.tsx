import { motion } from "framer-motion";
import { Compass, Lightbulb, Clapperboard, Wand2, Rocket, CheckCircle2 } from "lucide-react";

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
    timelineTag: "Day 1 – 2",
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
    timelineTag: "Day 2 – 4",
  },
  {
    number: "03",
    title: "Production & Generation Engine",
    subtitle: "Flawless physical shoot or high-velocity AI synthesis.",
    icon: Clapperboard,
    details: [
      "Physical shoots executed with dedicated cinema crews, precision lighting, and macro rigs",
      "Generative AI runs through our proprietary multi-model pipeline for photorealistic liquid, texture, and character fidelity",
      "3D CGI modeling, volumetric lighting passes, and particle dynamics rendered in-house",
      "Zero handoff friction — the strategists who wrote the brief direct the production",
    ],
    timelineTag: "Day 4 – 8",
  },
  {
    number: "04",
    title: "Post-Production & Precision Finish",
    subtitle: "Where good footage becomes high-converting commercial art.",
    icon: Wand2,
    details: [
      "Rhythm-driven edit cuts optimized for sub-second audience retention and hook drop-off elimination",
      "Hollywood-grade DaVinci Resolve color grading & HDR mastering",
      "Custom sound design, foley work, commercial music licensing, and resonant voiceover tracks",
      "VFX cleanup, graphic callouts, subtitles, and kinetic typography overlays",
    ],
    timelineTag: "Day 8 – 11",
  },
  {
    number: "05",
    title: "Review, Multi-Format Delivery & Scaling",
    subtitle: "Revision rounds until it's perfect, then omnichannel deployment.",
    icon: Rocket,
    details: [
      "Private Frame.io collaborative review portal with timestamped comments",
      "Comprehensive revision cycles included to ensure 100% brand adherence",
      "Full export suites: TikTok 9:16, Meta 4:5 / 1:1, YouTube 16:9, and lossless archive masters",
      "Ongoing partnership retainers for continuous monthly asset testing and refresh cycles",
    ],
    timelineTag: "Day 12 – 14",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#100E12] border-b border-white/10 overflow-hidden">
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

          <p className="mt-4 text-base sm:text-lg text-white/60 font-body leading-relaxed">
            Not just a vendor queue — we operate as your integrated video engineering department.
            A live-action shoot and an AI ad don't operate on identical clocks, so we plan in transparent phases with a definitive delivery calendar.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="mt-16 space-y-6">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative p-6 sm:p-8 rounded-3xl bg-[#17141A] border border-white/10 hover:border-primary/40 transition-all duration-300 shadow-xl overflow-hidden group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Step Index & Icon */}
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center font-mono font-black text-xl shrink-0 group-hover:bg-primary group-hover:text-black transition-colors duration-300 shadow-sm">
                      {step.number}
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5 mb-1">
                        <Icon className="w-3.5 h-3.5" />
                        {step.timelineTag}
                      </span>
                      <h3 className="font-heading font-bold text-white text-xl sm:text-2xl leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-white/50 font-body mt-1">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Step Deliverable Details */}
                  <div className="lg:col-span-8 space-y-3 pt-2 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-8">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-white/80 font-body leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
