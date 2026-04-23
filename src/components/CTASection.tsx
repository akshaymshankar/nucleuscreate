import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-28 sm:py-32 md:py-48 overflow-hidden bg-background">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-heading font-extrabold text-foreground leading-tight tracking-tight"
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, ease: [0.25, 0.4, 0, 1] }}
        >
          Stop chasing freelancers.
          <br />
          <span className="text-primary">Start shipping winners.</span>
        </motion.h2>

        <motion.p
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto font-body"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
        >
          Tell us your monthly volume. We'll send a deck and a 48-hour pilot offer.
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
        >
          <a
            href="mailto:hello@nucleus.studio"
            className="magnetic-btn inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-heading text-sm sm:text-base font-semibold tracking-wide hover:opacity-90 transition-all duration-300"
            data-cursor-hover
          >
            Book a 15-min Call
            <motion.span
              className="text-lg"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
