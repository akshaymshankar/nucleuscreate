import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageSquareQuote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Nucleus replaced our fragmented video stack entirely. We used to bounce between an AI tool for quick UGC and a sluggish production studio for hero launches. Nucleus produces both, matching our exact brand tone with zero friction.",
    author: "Rami K.",
    role: "Head of Growth",
    brand: "Glow & Mist Fragrance",
    tag: "AI + Live Action Hybrid",
    rating: 5,
  },
  {
    quote:
      "Our paid media CPA on TikTok dropped by 38% in the first 14 days of deploying the AI hook variations Nucleus delivered. The visual fidelity of our jewelry pieces is indistinguishable from physical macro studio shoots.",
    author: "Elena Rostova",
    role: "Creative Director",
    brand: "Arka Fine Jewels",
    tag: "AI Performance Ads",
    rating: 5,
  },
  {
    quote:
      "Speed without the typical AI slop. Their team understands direct response retention hooks, color grading, and actual brand prestige. 10 business days from brief to 6 polished multi-format assets.",
    author: "Tariq Al-Mansoor",
    role: "Founder & CMO",
    brand: "AutoHub Motors",
    tag: "Automotive 3D & AI",
    rating: 5,
  },
];

const faqs = [
  {
    q: "What kind of videos can you create?",
    a: "Product showcases, brand stories, direct response social ads, promotional campaign reels, technical explainers, and lifestyle content — across live-action, AI-generated, 3D motion graphics, or a hybrid of formats. We recommend the optimal mix based on your direct acquisition goal and budget.",
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
    <section id="testimonials" className="relative py-24 sm:py-32 bg-[#0B0A0D] border-b border-white/10 overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#f2542d]/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Testimonials Block */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#f2542d] bg-[#f2542d]/10 border border-[#f2542d]/25 mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Social Validation
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
            What brand founders & growth teams say.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 font-body">
            Direct feedback from brands actively running Nucleus-produced creative across global paid channels.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-[#141217] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#f2542d]/15 text-[#f2542d] border border-[#f2542d]/30 font-semibold">
                    {t.tag}
                  </span>
                  <div className="flex text-[#f2542d] text-xs">★★★★★</div>
                </div>

                <p className="text-sm text-white/80 font-body italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f2542d] to-amber-500 text-black font-heading font-black flex items-center justify-center text-sm shadow-md">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm leading-snug">{t.author}</h4>
                  <p className="text-[11px] text-white/50 font-body">
                    {t.role}, <span className="text-white/80">{t.brand}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Accordion Block */}
        <div id="faq" className="mt-28 pt-20 border-t border-white/10">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#f2542d] bg-[#f2542d]/10 border border-[#f2542d]/25 mb-4">
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
                    <span className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#f2542d] transition-colors">
                      {faq.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "bg-[#f2542d] text-black border-[#f2542d] rotate-45" : "text-white/70 group-hover:text-white"
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
