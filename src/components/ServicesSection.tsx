import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const oldWay = [
  { title: "Freelancers ghosting you", text: "They miss deadlines right when client CPAs are spiking." },
  { title: "Slow big studios", text: "Taking 14 days to deliver a single ad makes rapid testing impossible." },
  { title: "No performance knowledge", text: "They make \"pretty videos\" but don't understand hook rates or CTA pacing." },
  { title: "Unpredictable margins", text: "Per-project pricing makes your agency quotes complicated." },
];

const newWay = [
  { title: "Your dedicated back-office team", text: "We never miss a deadline. Period." },
  { title: "Built for speed", text: "We deliver massive batches in 48 hours for immediate testing." },
  { title: "Performance-native", text: "We edit strictly for conversion and audience retention." },
  { title: "Volume Pricing", text: "Flat, per-video costs that allow you to keep your agency margins massive." },
];

// Premium custom marks (not emoji)
const CrossMark = () => (
  <motion.div
    className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-destructive/30 bg-destructive/5 flex items-center justify-center"
    whileHover={{ rotate: 90, scale: 1.05 }}
    transition={{ duration: 0.4, ease: [0.25, 0.4, 0, 1] }}
  >
    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" stroke="hsl(0 70% 60%)" strokeWidth="2.2" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  </motion.div>
);

const CheckMark = () => (
  <motion.div
    className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center"
    whileHover={{ scale: 1.08 }}
    transition={{ duration: 0.4, ease: [0.25, 0.4, 0, 1] }}
  >
    <motion.svg
      viewBox="0 0 24 24"
      className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
      />
    </motion.svg>
    <motion.span
      className="absolute inset-0 rounded-full border border-primary/40"
      animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
    />
  </motion.div>
);

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-24 sm:py-32 md:py-40 overflow-hidden bg-background border-t border-border/40">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.span
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Difference
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Stop relying on unreliable <span className="text-primary">editing options.</span>
          </motion.h2>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Old Way */}
          <motion.div
            className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-border bg-card/40"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 pb-5 sm:pb-6 border-b border-border">
              <span className="text-[10px] tracking-[0.3em] uppercase text-destructive/70 font-heading">The Old Way</span>
            </div>
            <ul className="mt-6 space-y-5 sm:space-y-6">
              {oldWay.map((item, i) => (
                <motion.li
                  key={item.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                >
                  <CrossMark />
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-heading font-semibold text-foreground/80">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                      {item.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* New Way */}
          <motion.div
            className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-primary/30 bg-card overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="flex items-center gap-3 pb-5 sm:pb-6 border-b border-border">
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-heading">Our White-Label Engine</span>
            </div>
            <ul className="mt-6 space-y-5 sm:space-y-6">
              {newWay.map((item, i) => (
                <motion.li
                  key={item.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                >
                  <CheckMark />
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-heading font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                      {item.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
