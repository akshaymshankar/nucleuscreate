import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = ["Mumbai", "Delhi-NCR", "Bangalore", "Pune", "Hyderabad", "Gurgaon", "Noida", "Chennai"];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-24 overflow-hidden border-y border-border/20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <motion.span
          className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
        >
          Built for Tier-1 India
        </motion.span>
      </div>

      {/* Marquee */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden">
          <div className="marquee flex items-center gap-10 sm:gap-16 md:gap-24 whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <span
                key={`${client}-${i}`}
                className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-muted-foreground/20 hover:text-foreground transition-colors duration-500 select-none"
                data-cursor-hover
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClientsSection;
