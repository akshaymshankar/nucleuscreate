import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tiers = [
  {
    name: "Low Volume",
    range: "1 – 20 Videos / Month",
    price: "₹5,000",
    unit: "per video",
    features: ["48hr delivery", "Hook variations", "Dedicated Drive folder"],
    highlighted: false,
  },
  {
    name: "Agency Scale",
    range: "21 – 50 Videos / Month",
    price: "₹4,200",
    unit: "per video",
    features: [
      "Everything in Low Volume",
      "Formatting for all platforms (16:9, 9:16, 1:1)",
      "Priority queue",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise White-Label",
    range: "50+ Videos / Month",
    price: "₹3,000",
    unit: "per video",
    features: [
      "Everything in Agency Scale",
      "A wholly dedicated editing pod",
      "Slack channel + SLA",
    ],
    highlighted: false,
  },
];

const Tick = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative py-24 sm:py-32 md:py-40 overflow-hidden bg-background border-t border-border/40">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.span
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Pricing
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Wholesale pricing built for <span className="text-primary">agency margins.</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-sm sm:text-base text-muted-foreground max-w-2xl font-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            No rigid retainers. You only pay for the volume you need to test this month.
          </motion.p>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative p-7 sm:p-8 md:p-10 rounded-2xl border transition-colors duration-500 ${
                tier.highlighted
                  ? "border-primary/50 bg-card scale-100 md:scale-[1.03] z-10"
                  : "border-border bg-card/50 hover:border-primary/30"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.25, 0.4, 0, 1] }}
              data-cursor-hover
            >
              {tier.highlighted && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-heading font-semibold">
                    {tier.badge}
                  </div>
                </>
              )}

              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-heading">
                {tier.name}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-muted-foreground/80 font-body">
                {tier.range}
              </div>

              <div className="mt-6 sm:mt-8 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight">
                  {tier.price}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-body">{tier.unit}</span>
              </div>

              <div className="mt-7 sm:mt-8 h-px w-full bg-border" />

              <ul className="mt-6 sm:mt-7 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground font-body">
                    <Tick />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#apply"
                className={`magnetic-btn mt-8 sm:mt-10 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-heading font-semibold tracking-wide transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-primary/40"
                }`}
                data-cursor-hover
              >
                Apply for Pilot →
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 sm:mt-20 p-6 sm:p-8 rounded-2xl border border-border bg-card/40 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="text-[10px] tracking-[0.3em] uppercase text-primary font-heading mb-3">
            White-Label Notice
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
            Due to strictly enforced white-label agreements with our partner agencies, we do not publicly display
            our clients' coaching ads. We're happy to walk you through our private dashboard case studies on a
            <span className="text-foreground"> 15-minute call.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
