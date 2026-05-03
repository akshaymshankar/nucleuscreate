import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const AssemblyVisuals = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001
  });

  // Animation values
  // Animation values
  // Sticky window for 200vh height is roughly [0.33, 0.66]
  const opacity = useTransform(smoothProgress, [0.3, 0.35, 0.65, 0.7], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0.3, 0.4], [0.8, 1]);
  
  // Elements merging - mapped precisely to the sticky phase
  const mergeProgress = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
  
  // Element positions (merging to center)
  const x1 = useTransform(mergeProgress, [0, 1], [-400, 0]);
  const y1 = useTransform(mergeProgress, [0, 1], [-250, 0]);
  
  const x2 = useTransform(mergeProgress, [0, 1], [400, 0]);
  const y2 = useTransform(mergeProgress, [0, 1], [-150, 0]);
  
  const x3 = useTransform(mergeProgress, [0, 1], [0, 0]);
  const y3 = useTransform(mergeProgress, [0, 1], [400, 0]);

  // Rotations
  const rotate1 = useTransform(smoothProgress, [0.3, 0.7], [0, 720]);
  const rotate2 = useTransform(smoothProgress, [0.3, 0.7], [0, -720]);

  const nucleusOpacity = useTransform(mergeProgress, [0.7, 1], [0, 1]);
  const nucleusScale = useTransform(mergeProgress, [0.7, 1], [0.5, 1]);

  return (
    <section 
      ref={containerRef} 
      id="synthesis"
      className="relative h-[150vh] bg-background overflow-visible border-y border-white/5"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <motion.div 
          className="relative w-full max-w-4xl h-[600px] flex items-center justify-center"
          style={{ opacity, scale }}
        >
          {/* Connecting Lines (HUD style) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 600">
            <motion.path
              d="M 400 300 L 100 100"
              stroke="hsl(134 68% 45%)"
              strokeWidth="0.5"
              fill="none"
              style={{ pathLength: useTransform(mergeProgress, [0, 0.8], [1, 0]) }}
            />
            <motion.path
              d="M 400 300 L 700 200"
              stroke="hsl(134 68% 45%)"
              strokeWidth="0.5"
              fill="none"
              style={{ pathLength: useTransform(mergeProgress, [0, 0.8], [1, 0]) }}
            />
            <motion.path
              d="M 400 300 L 400 500"
              stroke="hsl(134 68% 45%)"
              strokeWidth="0.5"
              fill="none"
              style={{ pathLength: useTransform(mergeProgress, [0, 0.8], [1, 0]) }}
            />
          </svg>

          {/* Parts Merging */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              className="absolute p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-primary/20 shadow-2xl flex flex-col items-center gap-3"
              style={{ x: x1, y: y1, rotate: rotate1, opacity: useTransform(mergeProgress, [0.8, 1], [1, 0]) }}
            >
              <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold">Q</span>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-heading text-primary/60 font-bold">Quality</div>
            </motion.div>

            <motion.div 
              className="absolute p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-primary/20 shadow-2xl flex flex-col items-center gap-3"
              style={{ x: x2, y: y2, rotate: rotate2, opacity: useTransform(mergeProgress, [0.8, 1], [1, 0]) }}
            >
              <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold">C</span>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-heading text-primary/60 font-bold">Consistency</div>
            </motion.div>

            <motion.div 
              className="absolute p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-primary/20 shadow-2xl flex flex-col items-center gap-3"
              style={{ x: x3, y: y3, rotate: rotate1, opacity: useTransform(mergeProgress, [0.8, 1], [1, 0]) }}
            >
              <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold">B</span>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-heading text-primary/60 font-bold">Bandwidth</div>
            </motion.div>
          </div>

          {/* Central Nucleus (Appears when merged) */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            style={{ opacity: nucleusOpacity, scale: nucleusScale }}
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-6">
              <motion.div 
                className="absolute inset-[-50%] rounded-full bg-primary/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_20px_rgba(34,197,94,0.4)] z-10">
                <img 
                  src="/logo.png" 
                  className="w-full h-full object-cover scale-110" 
                  alt="Nucleus Logo" 
                />
              </div>
            </div>
            <motion.span 
              className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-semibold mb-2 text-center"
              style={{ opacity: useTransform(mergeProgress, [0.6, 0.8], [0, 1]) }}
            >
              The Assembly Structure
            </motion.span>
            <motion.h3 
              className="text-4xl sm:text-5xl font-heading font-black text-foreground tracking-tight text-center flex flex-col sm:block leading-[1.1]"
            >
              <span>NUCLEUS</span> <span className="text-primary italic">SYNTHESIS</span>
            </motion.h3>
            <p className="mt-4 text-muted-foreground font-body text-center max-w-md text-sm sm:text-base">
              Where volume meets surgical precision. Our engine merges quality, consistency, and bandwidth into a single, high-performance output.
            </p>
          </motion.div>
        </motion.div>

        {/* Text Reveal Overlays */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
          <motion.div
            style={{ opacity: useTransform(mergeProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0]) }}
            className="text-xs tracking-[0.5em] uppercase text-primary/40 font-heading font-bold"
          >
            Initiating Merging Sequence...
          </motion.div>
          <motion.div
            style={{ opacity: useTransform(mergeProgress, [0.4, 0.6, 0.8, 1], [0, 1, 1, 0]) }}
            className="text-xs tracking-[0.5em] uppercase text-primary/40 font-heading font-bold"
          >
            Calibrating Output Parameters
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AssemblyVisuals;
