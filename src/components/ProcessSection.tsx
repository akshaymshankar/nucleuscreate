import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "DNA Hook Mapping", desc: "We isolate hook DNA: promise, pattern break, and emotional trigger from your niche data." },
  { num: "02", title: "Chipset Build", desc: "Winning scripts move into a modular edit stack like assembling high-performance laptop components." },
  { num: "03", title: "Render Spine", desc: "Narrative spine, captions, and pacing layers get assembled to maximize first-3-second retention." },
  { num: "04", title: "Signal Testing", desc: "Each variation is deployed and scored by hook rate, hold rate, CTR, and qualified lead quality." },
  { num: "05", title: "Scale Engine", desc: "Top performers are multiplied into a high-output creative engine with consistent premium delivery." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  return (
    <section id="process" className="relative py-28 sm:py-32 overflow-hidden bg-background border-t border-border/40">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <motion.span
          className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
        >
          Creative Assembly
        </motion.span>

        <motion.h2
          className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
        >
          Watch ideas assemble into <span className="text-primary">performance systems.</span>
        </motion.h2>

        <div className="mt-12 sm:mt-16 relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14">
          <motion.div
            className="absolute left-3 sm:left-4 md:left-8 top-0 bottom-0 w-px bg-border hidden lg:block"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0, 1] }}
          />

          <div className="space-y-10 sm:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex gap-6 sm:gap-8 md:gap-16 pl-10 sm:pl-12 md:pl-24"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.25, 0.4, 0, 1] }}
              >
                <motion.div
                  className="absolute left-1.5 sm:left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: [1, 1.35, 1] } : { scale: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 300, damping: 15 }}
                />

                <div>
                  <span className="text-[10px] sm:text-sm text-primary/40 font-heading">{step.num}</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mt-1">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-muted-foreground max-w-md font-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative rounded-3xl border border-primary/25 bg-card/80 p-6 sm:p-8 overflow-hidden min-h-[380px]"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(134_68%_45%/.2),transparent_45%)] pointer-events-none" />
            <div className="relative">
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary/80 font-heading">Assembly Visualizer</div>
              <div className="mt-6 space-y-5">
                {["DNA Helix Layer", "Laptop Frame Matrix", "Signal Routing Bus", "Render Core", "Output Feed"].map((part, i) => (
                  <motion.div
                    key={part}
                    className="relative rounded-xl border border-border bg-background/60 p-4"
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-heading text-foreground">{part}</span>
                      <motion.span
                        className="inline-block w-2.5 h-2.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.15, 0.9] }}
                        transition={{ duration: 1.6, delay: i * 0.15, repeat: Infinity }}
                      />
                    </div>
                    <motion.div
                      className="mt-3 h-1 rounded-full bg-primary/30 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.55, ease: "easeOut" }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
