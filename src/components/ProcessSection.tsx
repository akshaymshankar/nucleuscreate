import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ProcessSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use springs for smoother motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Laptop opening and positioning
  const lidRotate = useTransform(smoothProgress, [0.15, 0.45], [-110, -10]);
  const laptopScale = useTransform(smoothProgress, [0.1, 0.35, 0.6, 0.85], [0.8, 1, 1, 0.9]);
  const laptopY = useTransform(smoothProgress, [0.1, 0.45, 0.7, 0.9], [100, 0, 0, -50]);
  const laptopOpacity = useTransform(smoothProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  
  // Screen content reveal
  const screenOpacity = useTransform(smoothProgress, [0.35, 0.5], [0, 1]);
  const screenScale = useTransform(smoothProgress, [0.35, 0.55], [0.95, 1]);
  
  // Floating elements around the laptop
  const floatY1 = useTransform(smoothProgress, [0.2, 0.8], [0, -120]);
  const floatY2 = useTransform(smoothProgress, [0.2, 0.8], [0, -80]);
  const floatRotate = useTransform(smoothProgress, [0.2, 0.8], [0, 15]);

  // Status indicators on the screen
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      if (v < 0.35) setActiveStep(0);
      else if (v < 0.55) setActiveStep(1);
      else if (v < 0.75) setActiveStep(2);
      else setActiveStep(3);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const steps = [
    { title: "Initialize Engine", desc: "Setting up creative parameters" },
    { title: "Assemble Sequence", desc: "Pacing & hook optimization" },
    { title: "Parallel Rendering", desc: "40-100+ variations in sync" },
    { title: "Final QC & Push", desc: "Ready for scale" }
  ];

  return (
    <section id="process" ref={ref} className="relative h-[300vh] border-t border-border/40 bg-background overflow-visible">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-screen pointer-events-none overflow-hidden sticky">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ 
            background: "radial-gradient(circle, hsl(134 68% 45%), transparent 70%)",
            scale: useTransform(smoothProgress, [0.2, 0.5], [0.8, 1.2])
          }}
        />
      </div>

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-4 sm:mb-8">
            <motion.span 
              className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-semibold"
              style={{ opacity: useTransform(smoothProgress, [0.1, 0.25, 0.75, 0.85], [0, 1, 1, 0]) }}
            >
              The Assembly Pipeline
            </motion.span>
            <motion.h2 
              className="mt-4 text-3xl sm:text-5xl md:text-6xl font-heading font-black text-foreground tracking-tight"
              style={{ 
                opacity: useTransform(smoothProgress, [0.15, 0.3, 0.75, 0.85], [0, 1, 1, 0]),
                y: useTransform(smoothProgress, [0.15, 0.3], [20, 0])
              }}
            >
              Nucleus <span className="text-primary italic">Engine</span>
            </motion.h2>
          </div>

          {/* 3D Laptop Container */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-[650px] [perspective:2000px]">
            <motion.div 
              style={{ 
                scale: laptopScale, 
                y: laptopY, 
                opacity: laptopOpacity,
                rotateX: useTransform(smoothProgress, [0.1, 0.5], [10, 5])
              }}
              className="relative w-full aspect-[16/10] flex items-end justify-center"
            >
              {/* Laptop Lid (Top) */}
              <motion.div 
                className="absolute w-[92%] h-[92%] bottom-[4%] origin-bottom z-20"
                style={{ rotateX: lidRotate, transformStyle: "preserve-3d" }}
              >
                {/* External Lid (Back) */}
                <div 
                  className="absolute inset-0 bg-[#121212] rounded-t-2xl border border-white/5 shadow-2xl [backface-visibility:hidden]"
                  style={{ transform: "rotateX(180deg)" }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20 blur-md animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary relative z-10" />
                  </div>
                </div>

                {/* Internal Lid (Screen Side) */}
                <div 
                  className="absolute inset-0 bg-[#080808] rounded-t-2xl border-4 border-[#121212] overflow-hidden shadow-inner flex flex-col [backface-visibility:hidden]"
                  style={{ transform: "none" }}
                >
                  {/* Camera / Notch Area */}
                  <div className="w-full h-6 flex items-center justify-center">
                    <div className="w-20 h-4 bg-[#121212] rounded-b-xl flex items-center justify-center gap-1.5 px-3">
                      <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-black border border-white/5" />
                    </div>
                  </div>

                  {/* Screen Content */}
                  <motion.div 
                    className="flex-1 m-1.5 rounded-lg bg-[#050505] relative overflow-hidden border border-white/5 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
                    style={{ opacity: screenOpacity, scale: screenScale }}
                  >
                    {/* Creative Video Editor UI */}
                    <div className="absolute inset-0 flex flex-col bg-[#050505] font-sans">
                      {/* Top Bar */}
                      <div className="h-6 border-b border-white/5 flex items-center px-3 justify-between bg-[#0a0a0a]">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500/80" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                          <div className="w-2 h-2 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-[7px] uppercase tracking-widest text-white/40 font-medium">Nucleus Creative Engine</div>
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-sm bg-white/10" />
                        </div>
                      </div>
                      
                      {/* Workspace */}
                      <div className="flex-1 flex gap-2 p-2">
                        {/* Media Bin */}
                        <div className="w-1/4 bg-[#0a0a0a] rounded border border-white/5 p-2 flex flex-col gap-2">
                          <div className="text-[6px] text-white/30 uppercase tracking-wider mb-1">Project Media</div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[1,2,3,4,5,6].map(i => (
                              <div key={i} className="aspect-video bg-white/5 rounded-sm border border-white/10 overflow-hidden relative">
                                <motion.div 
                                  className="absolute inset-0 bg-primary/20"
                                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                                  transition={{ duration: 2 + i*0.5, repeat: Infinity }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Preview Player */}
                        <div className="flex-1 bg-black rounded border border-white/10 relative overflow-hidden flex items-center justify-center">
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary/20 border border-primary/50 text-primary text-[5px] font-bold rounded-sm uppercase tracking-wider flex items-center gap-1 z-10">
                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            Rendering Node
                          </div>
                          <motion.div 
                            className="w-4/5 aspect-video rounded-md border border-white/10 relative overflow-hidden shadow-2xl"
                            style={{
                              background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(0,0,0,1))"
                            }}
                          >
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Abstract Video Element */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div 
                                className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center relative"
                                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              >
                                <motion.div 
                                  className="w-full h-full rounded-full border-t-2 border-primary absolute"
                                  animate={{ rotate: -720 }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="w-0 h-0 border-l-[8px] border-l-primary border-y-[5px] border-y-transparent ml-1" />
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Settings / Inspector */}
                        <div className="w-1/4 bg-[#0a0a0a] rounded border border-white/5 p-2 flex flex-col">
                           <div className="text-[6px] text-white/30 uppercase tracking-wider mb-2">Hook Optimization</div>
                           <div className="space-y-3">
                             {[
                               { label: "Pacing Speed", val: "85%" },
                               { label: "Visual Retention", val: "92%" },
                               { label: "Audio Dynamics", val: "78%" }
                             ].map((setting, i) => (
                               <div key={i}>
                                 <div className="flex justify-between text-[5px] text-white/50 mb-1">
                                   <span>{setting.label}</span>
                                   <span className="text-primary">{setting.val}</span>
                                 </div>
                                 <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                   <motion.div 
                                     className="h-full bg-primary" 
                                     initial={{ width: "0%" }}
                                     animate={{ width: setting.val }}
                                     transition={{ duration: 1.5, delay: i * 0.2 }}
                                   />
                                 </div>
                               </div>
                             ))}
                           </div>
                           
                           <div className="mt-auto">
                             <div className="h-12 rounded bg-primary/10 border border-primary/20 flex items-center justify-center relative overflow-hidden">
                               <motion.div 
                                 className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                                 animate={{ opacity: [0.5, 1, 0.5] }}
                                 transition={{ duration: 1, repeat: Infinity }}
                               />
                               <span className="text-[7px] text-primary font-bold tracking-widest uppercase">Exporting Batch</span>
                             </div>
                           </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="h-[30%] bg-[#0a0a0a] border-t border-white/5 p-2 flex flex-col relative overflow-hidden">
                        {/* Playhead */}
                        <motion.div 
                          className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-10"
                          animate={{ left: ["10%", "90%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="w-1.5 h-1.5 rounded-sm bg-red-500 -ml-[2px] top-0 absolute" />
                        </motion.div>

                        <div className="h-3 flex border-b border-white/5 text-[5px] text-white/30 px-2 gap-8 items-center">
                          <span>00:00:00</span>
                          <span>00:00:01</span>
                          <span>00:00:02</span>
                          <span>00:00:03</span>
                        </div>
                        
                        <div className="flex-1 flex flex-col gap-1 py-1">
                          {/* Video Track */}
                          <div className="flex-1 bg-white/[0.02] rounded flex items-center px-1 gap-1">
                            <span className="text-[4px] text-white/20 w-4">V1</span>
                            <motion.div className="h-[70%] w-1/3 bg-blue-500/30 rounded-sm border border-blue-500/40 relative overflow-hidden">
                              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)]" />
                            </motion.div>
                            <motion.div className="h-[70%] w-1/2 bg-blue-500/30 rounded-sm border border-blue-500/40" />
                          </div>
                          {/* Text Track */}
                          <div className="flex-1 bg-white/[0.02] rounded flex items-center px-1 gap-1">
                            <span className="text-[4px] text-white/20 w-4">T1</span>
                            <motion.div className="h-[60%] w-1/4 bg-yellow-500/30 rounded-sm border border-yellow-500/40 ml-4 flex items-center px-1">
                              <span className="text-[3px] text-yellow-500/80 font-bold">HOOK.TXT</span>
                            </motion.div>
                            <motion.div className="h-[60%] w-1/4 bg-yellow-500/30 rounded-sm border border-yellow-500/40 ml-2" />
                          </div>
                          {/* Audio Track */}
                          <div className="flex-1 bg-white/[0.02] rounded flex items-center px-1 gap-1">
                            <span className="text-[4px] text-white/20 w-4">A1</span>
                            <motion.div className="h-[80%] flex-1 bg-green-500/20 rounded-sm border border-green-500/30 flex items-center justify-center overflow-hidden px-1">
                               {/* Waveform abstraction */}
                               <div className="w-full h-full flex items-center gap-[1px]">
                                 {Array.from({ length: 50 }).map((_, i) => (
                                   <motion.div 
                                     key={i}
                                     className="flex-1 bg-green-500/40 rounded-full"
                                     animate={{ height: [Math.random() * 80 + 20 + "%", Math.random() * 80 + 20 + "%"] }}
                                     transition={{ duration: 0.2 + Math.random() * 0.3, repeat: Infinity, repeatType: "mirror" }}
                                   />
                                 ))}
                               </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glowing effect from screen */}
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay shadow-[inset_0_0_100px_rgba(34,197,94,0.1)]" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Laptop Base (Bottom) */}
              <div className="relative w-full h-[6%] bg-[#1a1a1a] rounded-b-2xl border-x border-b border-white/10 shadow-2xl z-30 overflow-hidden">
                {/* Keyboard Bed */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#121212] to-[#1a1a1a] shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)]" />
                
                {/* Thin top edge reflecting screen */}
                <motion.div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%] h-[1px] bg-primary/20 blur-[1px]"
                  style={{ opacity: useTransform(smoothProgress, [0.4, 0.5], [0, 1]) }}
                />
              </div>

              {/* Laptop Main Body (Hidden below for 3D effect) */}
              <div className="absolute bottom-[-10%] w-[98%] h-[12%] bg-[#0f0f0f] rounded-2xl border border-white/5 shadow-2xl -z-10" />
            </motion.div>

            {/* Floating Process Indicators */}
            <div className="absolute -left-12 top-1/4 z-0 hidden lg:block">
              <motion.div 
                style={{ y: floatY1, rotate: floatRotate, opacity: laptopOpacity }}
                className="p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-white/5 shadow-2xl max-w-[180px]"
              >
                <div className="text-[10px] text-primary font-heading font-bold mb-2 tracking-widest uppercase">Pacing Logic</div>
                <div className="space-y-1.5">
                  <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary" animate={{ width: ["10%", "90%", "40%"] }} transition={{ duration: 3, repeat: Infinity }} />
                  </div>
                  <div className="h-1 w-3/4 bg-primary/20 rounded-full" />
                </div>
              </motion.div>
            </div>

            <div className="absolute -right-8 bottom-1/3 z-0 hidden lg:block">
              <motion.div 
                style={{ y: floatY2, rotate: useTransform(smoothProgress, [0.2, 0.8], [0, -10]), opacity: laptopOpacity }}
                className="p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-white/5 shadow-2xl max-w-[180px]"
              >
                <div className="text-[10px] text-primary font-heading font-bold mb-2 tracking-widest uppercase">Variation Stack</div>
                <div className="flex gap-1 flex-wrap">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Process Labels / Stepper */}
          <div className="mt-8 max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  className="relative group"
                  style={{ 
                    opacity: useTransform(smoothProgress, [0.1 + i*0.15, 0.25 + i*0.15, 0.85, 0.95], [0, 1, 1, 0]),
                    y: useTransform(smoothProgress, [0.1 + i*0.15, 0.25 + i*0.15], [20, 0])
                  }}
                >
                  <div className={`text-[10px] font-heading font-bold mb-2 transition-colors duration-500 ${activeStep >= i ? 'text-primary' : 'text-muted-foreground/40'}`}>
                    0{i + 1}
                  </div>
                  <h4 className={`text-sm sm:text-base font-heading font-bold mb-1 transition-colors duration-500 ${activeStep >= i ? 'text-foreground' : 'text-muted-foreground/30'}`}>
                    {step.title}
                  </h4>
                  <p className={`text-[10px] sm:text-xs font-body leading-relaxed transition-colors duration-500 ${activeStep >= i ? 'text-muted-foreground' : 'text-muted-foreground/10'}`}>
                    {step.desc}
                  </p>
                  
                  {/* Progress Line */}
                  <div className="absolute -top-4 left-0 w-full h-[1px] bg-white/5">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: activeStep >= i ? "100%" : "0%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

