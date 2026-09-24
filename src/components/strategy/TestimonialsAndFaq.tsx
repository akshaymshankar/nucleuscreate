import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What kind of videos can you create?",
    a: "Product showcases, brand stories, direct response social ads, promotional campaign reels, technical explainers, and lifestyle content — across live-action, AI-generated with editing, 3D motion graphics, or a hybrid of formats. We recommend the optimal mix based on your direct acquisition goal and budget.",
  },
  {
    q: "How do you decide between live-action, AI, or motion graphics?",
    a: "On the initial strategy call, we analyze your unit economics, timeline, and what the creative must prove to the viewer. Some briefs need real human hands and tactile physical locations; others achieve 5x faster testing velocity with generative AI or 3D CAD animation. We give you transparent advice — even if that means recommending a more economical format.",
  },
  {
    q: "How long does delivery take?",
    a: "Generative AI and motion graphics projects typically ship in 7 to 10 business days. Live-action and hybrid projects depend on talent casting and studio scheduling, usually delivering within 12 to 18 business days with clear milestone checkpoints.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes — every single project includes structured revision rounds. You review drafts on a collaborative timestamped portal where you can leave visual notes directly on the video frames until every second satisfies your brand standards.",
  },
  {
    q: "What formats do I receive upon final sign-off?",
    a: "Lossless high-bitrate MP4 and ProRes masters, pre-configured with custom safe-zones for TikTok / Instagram Reels (9:16), Meta Feed (4:5 and 1:1), YouTube Shorts, and standard widescreen 16:9 for website hero backgrounds and TV displays.",
  },
  {
    q: "Do you provide scripts, voiceovers, and sound design?",
    a: "Yes! We run complete end-to-end creative: direct-response concept development, conversion copywriting, native multi-lingual voice talent (or ethical neural voice synthesis), commercial music licensing, and custom foley sound design.",
  },
  {
    q: "What makes your AI video quality look so realistic compared to generic AI tools?",
    a: "We do not rely on simple one-click consumer apps. We ingest your real physical CAD/product photography, run proprietary multi-pass neural rendering, apply optical lens simulation, and polish in DaVinci Resolve with Hollywood color science to eliminate the tell-tale 'AI gloss' or uncanny distortions.",
  },
  {
    q: "How do I get started?",
    a: "Book a free strategy call. We'll examine your product, determine your most lucrative format strategy, and give you a comprehensive timeline and budget framework — zero commitment required.",
  },
];

export default function TestimonialsAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#0B0A0D] border-b border-white/10 overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* FAQ Accordion Block */}
        <div>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/25 mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Addressed
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Got questions? Direct answers.
            </h3>
            <p className="mt-4 text-base sm:text-lg text-white/60 font-body">
              Everything you need to know about formats, licensing, turnaround times, and workflow collaboration.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;

              return (
                <div key={i} className="py-5 sm:py-6 transition-colors">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between gap-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "bg-primary text-black border-primary rotate-45 shadow-[0_0_12px_rgba(34,197,94,0.4)]" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pb-2 text-sm sm:text-base text-white/65 font-body leading-relaxed max-w-4xl">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
