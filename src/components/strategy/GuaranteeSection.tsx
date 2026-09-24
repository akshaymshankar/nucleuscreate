import { ShieldCheck, Clock, RefreshCw, Users, FileCheck, Palette, Camera, FileText, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const guarantees = [
  {
    icon: Clock,
    title: "Guaranteed On-Time Delivery",
    description:
      "Whatever format you choose — live-action, generative AI, or 3D motion graphics — your project ships strictly on the agreed date. No vendor delays, no moving goalposts.",
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
    icon: Users,
    title: "Dedicated Strategic Squad",
    description:
      "Direct Slack/WhatsApp line and dedicated creative director from initial kickoff call to final delivery. A senior creative partner in your corner, never a faceless ticket queue.",
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
  return (
    <section id="guarantee" className="relative py-24 sm:py-32 bg-[#100E12] border-b border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-primary/5 blur-[160px] pointer-events-none" />

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

          <p className="mt-4 text-base sm:text-lg text-white/60 font-body leading-relaxed">
            Eliminating agency risk with concrete commitments. We back our creative execution with clear guarantees that traditional production houses refuse to make.
          </p>
        </div>

        {/* Part 1: Guarantees Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((g, idx) => {
            const Icon = g.icon;

            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-7 sm:p-8 rounded-3xl bg-[#17141A] border border-white/10 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {g.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-xl leading-snug">
                    {g.title}
                  </h3>

                  <p className="text-sm text-white/60 mt-3 font-body leading-relaxed">
                    {g.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Contractually Enforced</span>
                </div>
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
