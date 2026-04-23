import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "The Brief", desc: "Drop your offer, audience, and winning angles in a 10-min Loom or doc." },
  { num: "02", title: "Hook Engineering", desc: "We script 3–5 hook variants per concept — built for Indian Tier-1/2 triggers." },
  { num: "03", title: "Edit Sprint", desc: "First batch lands in 48 hours. Daily drops after that. No WhatsApp chasing." },
  { num: "04", title: "Iterate on Data", desc: "You share hook rate, hold rate, CPL. We double down on what's winning." },
  { num: "05", title: "Scale", desc: "Push to 50–100+ creatives a month as your ad spend climbs. Margins intact." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="relative py-28 sm:py-32 overflow-hidden bg-background">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <motion.span
          className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
        >
          The Workflow
        </motion.span>

        <motion.h2
          className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
        >
          From brief to scaled spend.
        </motion.h2>

        <div className="mt-12 sm:mt-16 relative">
          <motion.div
            className="absolute left-3 sm:left-4 md:left-8 top-0 bottom-0 w-px bg-border"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0, 1] }}
          />

          <div className="space-y-10 sm:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex gap-6 sm:gap-8 md:gap-16 pl-10 sm:pl-12 md:pl-24"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.25, 0.4, 0, 1] }}
              >
                <motion.div
                  className="absolute left-1.5 sm:left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
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
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
