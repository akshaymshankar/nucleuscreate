import { motion } from "framer-motion";
import { useRef } from "react";

const AssemblyVisuals = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const mergeVariants = {
    hidden: (custom: any) => ({
      x: custom.x,
      y: custom.y,
      opacity: 1,
      scale: 1,
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="synthesis"
      className="relative py-24 lg:py-32 bg-background overflow-hidden border-y border-white/5 flex items-center justify-center min-h-screen"
    >
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <motion.div 
        className="relative w-full aspect-square max-w-4xl max-h-[600px] flex items-center justify-center z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Parts Merging */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="absolute p-6 rounded-2xl bg-card border border-primary/20 shadow-2xl flex flex-col items-center gap-3 will-change-transform"
            custom={{ x: -200, y: -200 }}
            variants={mergeVariants}
          >
            <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-bold">Q</span>
            </div>
            <div className="text-[10px] tracking-widest uppercase font-heading text-primary/60 font-bold">Quality</div>
          </motion.div>

          <motion.div 
            className="absolute p-6 rounded-2xl bg-card border border-primary/20 shadow-2xl flex flex-col items-center gap-3 will-change-transform"
            custom={{ x: 200, y: -150 }}
            variants={mergeVariants}
          >
            <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-bold">C</span>
            </div>
            <div className="text-[10px] tracking-widest uppercase font-heading text-primary/60 font-bold">Consistency</div>
          </motion.div>

          <motion.div 
            className="absolute p-6 rounded-2xl bg-card border border-primary/20 shadow-2xl flex flex-col items-center gap-3 will-change-transform"
            custom={{ x: 0, y: 200 }}
            variants={mergeVariants}
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
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { delay: 1, duration: 1, ease: "easeOut" }
            }
          }}
        >
          <div className="relative mb-6">
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-primary/30 flex items-center justify-center relative z-10 bg-black/50 backdrop-blur-sm">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-primary/20 absolute blur-md animate-pulse" />
              <div className="w-4 sm:w-6 h-4 sm:h-6 bg-primary rounded-full absolute" />
            </div>
          </div>
          
          <motion.span 
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-semibold mb-2 text-center"
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
    </section>
  );
};

export default AssemblyVisuals;
