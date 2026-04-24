import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FolderTree, Timer, Target } from "lucide-react";

const proofs = [
  {
    icon: FolderTree,
    title: "Unmatched Volume.",
    text: "Whether you need 20, 50, or 100 variations a month, our team never misses a batch upload.",
    num: "01",
  },
  {
    icon: Timer,
    title: "48-Hour Guarantee.",
    text: "The Meta algorithm moves fast, so do we. Send a raw brief on Monday, run ads on Wednesday.",
    num: "02",
  },
  {
    icon: Target,
    title: "We Understand Hooks.",
    text: "We don't just \"cut clips.\" We optimize for the first 3 seconds, pacing, and coaching psychology.",
    num: "03",
  },
];

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  return (
    <section id="proof" className="relative py-24 sm:py-32 md:py-40 overflow-hidden bg-background">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.span
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            The Proof
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(10px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Built for rapid <span className="text-primary">A/B testing.</span>
          </motion.h2>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {proofs.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                className="group relative p-7 sm:p-8 md:p-10 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-500 smooth-hover"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(12px)" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-border bg-background flex items-center justify-center group-hover:border-primary/40 group-hover:text-primary transition-all duration-400">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-primary/40 font-heading">{p.num}</span>
                </div>
                <h3 className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
                  {p.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stat strip */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          {[
            { num: "48hr", label: "Turnaround" },
            { num: "100+", label: "Videos / month" },
            { num: "₹3,000", label: "From / video" },
            { num: "2,000+", label: "Tier-1 agencies" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.7 }}
              className="text-center md:text-left"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-primary tracking-tight">
                {stat.num}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
