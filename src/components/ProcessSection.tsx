import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ProcessSection = () => {
  const ref = useRef<HTMLElement | null>(null);

  // Status indicators on the screen - fully static now
  const activeStep = 3;

  // Responsive screen UI scaling
  const screenRef = useRef<HTMLDivElement>(null);
  const [uiScale, setUiScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (screenRef.current) {
        const width = screenRef.current.clientWidth;
        // The inner UI is 600px wide. We scale it to match the actual screen width.
        setUiScale(width / 600);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const steps = [
    { title: "PROTOCOL BRIEFING", desc: "Setting up strategic creative parameters." },
    { title: "ANGLE ARCHITECTURE", desc: "Mapping high-retention hooks and pacing." },
    { title: "BATCH VARIABLE EXPORT", desc: "Rendering 40–100+ variations in sync." },
    { title: "ZERO-ERROR DELIVERY", desc: "Final QC & automated push to folders." }
  ];

  return (
    <section id="process" ref={ref} className="relative py-24 lg:py-32 border-t border-border/40 bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-20"
          style={{ 
            background: "radial-gradient(circle, hsl(134 68% 45% / 0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 shrink-0">
          <span 
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-semibold"
          >
            The Assembly Pipeline
          </span>
          <h2 
            className="mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground tracking-tight"
          >
            Nucleus <span className="text-primary italic">Engine</span>
          </h2>
        </div>

        {/* 3D Laptop Container */}
        <motion.div 
          initial="closed"
          whileInView="open"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[600px] [perspective:2000px] shrink-1 min-h-[200px]"
        >
          <motion.div 
            variants={{
              closed: { scale: 0.8, y: 100, rotateX: 10 },
              open: { scale: 1, y: 0, rotateX: 5 }
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[16/10] flex items-end justify-center"
          >
            {/* Laptop Lid (Top) */}
            <motion.div 
              className="absolute w-[92%] h-[92%] bottom-[4%] origin-bottom z-20"
              variants={{
                closed: { rotateX: -110 },
                open: { rotateX: -10 }
              }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ transformStyle: "preserve-3d" }}
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
                  <div className="w-full h-4 sm:h-6 flex items-center justify-center">
                    <div className="w-16 sm:w-20 h-3 sm:h-4 bg-[#121212] rounded-b-xl flex items-center justify-center gap-1.5 px-3">
                      <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-black border border-white/5" />
                    </div>
                  </div>

                  {/* Screen Content */}
                  <motion.div 
                    ref={screenRef}
                    className="flex-1 m-1 sm:m-1.5 rounded-lg bg-[#050505] relative overflow-hidden border border-white/5 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
                    style={{ opacity: screenOpacity, scale: screenScale }}
                  >
                    {/* Creative Video Editor UI */}
                    <div 
                      className="absolute top-0 left-0 w-[600px] h-[375px] flex flex-col bg-[#050505] font-sans origin-top-left"
                      style={{ transform: `scale(${uiScale})` }}
                    >
                      {/* Top Bar */}
                      <div className="h-8 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a]">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <div className="text-[10px] font-mono tracking-widest text-white/20 uppercase">Nucleus // Performance_Engine</div>
                        <div className="w-4 h-4" />
                      </div>

                      {/* Main Workspace */}
                      <div className="flex-1 flex p-2 gap-2">
                        {/* Media Bin */}
                        <div className="w-48 bg-[#0a0a0a] rounded border border-white/5 p-2 flex flex-col">
                          <div className="text-[8px] tracking-widest uppercase text-white/40 mb-2">Project Media</div>
                          <div className="grid grid-cols-2 gap-2 overflow-hidden">
                            {[
                              "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=150",
                              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
                              "https://images.unsplash.com/photo-1511746315387-c4a76990fdce?auto=format&fit=crop&q=80&w=150",
                              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=150",
                              "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=150",
                              "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=150"
                            ].map((url, i) => (
                              <div key={i} className="aspect-video bg-white/5 rounded border border-white/10 overflow-hidden relative group">
                                <img src={url} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Preview & Controls */}
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="flex-1 bg-gradient-to-br from-[#0a0a0a] to-black rounded border border-white/5 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary/20 border border-primary/50 text-primary text-[5px] font-mono font-bold rounded-sm uppercase tracking-wider flex items-center gap-1 z-10">
                              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                              Syncing Protocol [ON]
                            </div>
                            <div className="absolute top-2 right-2 px-1.5 py-0.5 text-white/40 text-[6px] font-mono tracking-widest z-10">
                              47:59:59
                            </div>
                            
                            {/* Render Preview */}
                            <div className="w-[80%] aspect-video rounded shadow-2xl relative overflow-hidden border border-white/10">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_70%)]" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                  animate={{ rotate: 360 }} 
                                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center"
                                >
                                  <motion.div 
                                    animate={{ rotate: -360 }} 
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-12 h-12 border-t-2 border-r-2 border-primary rounded-full"
                                  />
                                </motion.div>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 bg-primary/10 rounded-full border border-primary/30 flex items-center justify-center backdrop-blur-sm">
                                  <div className="w-2 h-2 border-y-4 border-l-6 border-y-transparent border-l-primary ml-1" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Inspector / Details */}
                        <div className="w-40 bg-[#0a0a0a] rounded border border-white/5 p-2 flex flex-col gap-3">
                          <div>
                            <div className="text-[6px] text-white/40 uppercase tracking-widest mb-1">Performance_Data</div>
                            <div className="space-y-1.5">
                              <div>
                                <div className="flex justify-between text-[5px] text-white/60 mb-0.5">
                                  <span>Retention.Hook</span>
                                  <span className="text-primary font-mono">94%</span>
                                </div>
                                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: activeStep >= 1 ? "94%" : "0%" }}
                                    transition={{ duration: 1 }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-[5px] text-white/60 mb-0.5">
                                  <span>A/B.Angle_Match</span>
                                  <span className="text-primary font-mono">88%</span>
                                </div>
                                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: activeStep >= 2 ? "88%" : "0%" }}
                                    transition={{ duration: 1 }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-[5px] text-white/60 mb-0.5">
                                  <span>Sync.Protocol</span>
                                  <span className="text-primary font-mono">100%</span>
                                </div>
                                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: activeStep >= 3 ? "100%" : "0%" }}
                                    transition={{ duration: 1 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-auto">
                            <motion.div 
                              className="w-full py-1.5 border border-primary/30 bg-primary/10 rounded flex flex-col items-center justify-center gap-0.5"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="text-[5px] text-primary uppercase tracking-widest font-bold">Syncing_Batch</div>
                              <div className="text-[4px] text-primary/60 uppercase tracking-widest">Ready_to_deploy</div>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="h-20 bg-[#0a0a0a] border-t border-white/5 p-2 flex flex-col">
                        <div className="flex justify-between text-[5px] font-mono text-white/30 px-2">
                          <span>00:00:00</span>
                          <span>00:00:15</span>
                          <span>00:00:30</span>
                          <span>00:00:45</span>
                        </div>
                        <div className="flex-1 relative mt-1">
                          {/* Playhead */}
                          <motion.div 
                            className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-10"
                            animate={{ x: [0, 500, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="absolute -top-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" />
                          </motion.div>
                          
                          {/* Tracks */}
                          <div className="absolute inset-0 flex flex-col justify-center gap-1">
                            <div className="flex gap-1 h-3 items-center">
                              <span className="text-[4px] text-white/20 w-2">V1</span>
                              <div className="h-2 w-[30%] bg-blue-500/20 border border-blue-500/40 rounded-sm overflow-hidden relative">
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(59,130,246,0.1)_2px,rgba(59,130,246,0.1)_4px)]" />
                              </div>
                              <div className="h-2 w-[45%] bg-blue-500/20 border border-blue-500/40 rounded-sm overflow-hidden relative">
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(59,130,246,0.1)_2px,rgba(59,130,246,0.1)_4px)]" />
                              </div>
                            </div>
                            <div className="flex gap-1 h-3 items-center">
                              <span className="text-[4px] text-white/20 w-2">A1</span>
                              <div className="h-2 w-[25%] bg-yellow-500/20 border border-yellow-500/40 rounded-sm ml-6 overflow-hidden flex items-center px-1">
                                <svg preserveAspectRatio="none" viewBox="0 0 100 10" className="w-full h-full opacity-50">
                                  <path d="M0,5 Q5,1 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-yellow-500"/>
                                </svg>
                              </div>
                              <div className="h-2 w-[25%] bg-yellow-500/20 border border-yellow-500/40 rounded-sm overflow-hidden flex items-center px-1">
                                <svg preserveAspectRatio="none" viewBox="0 0 100 10" className="w-full h-full opacity-50">
                                  <path d="M0,5 Q5,9 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-yellow-500"/>
                                </svg>
                              </div>
                            </div>
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
                <div className="absolute top-0 inset-x-0 h-[1px] bg-white/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/3 bg-black/40 rounded-full blur-[2px]" />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Trackpad indentation */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[20%] h-[40%] bg-[#121212] rounded-t-sm border-t border-x border-white/5 shadow-inner" />
              </div>

              {/* Base shadow */}
              <div className="absolute bottom-[-10%] w-[98%] h-[12%] bg-[#0f0f0f] rounded-2xl border border-white/5 shadow-2xl -z-10" />
            </motion.div>

            {/* Floating UI Elements */}
            <div className="absolute -left-4 sm:-left-12 top-1/4 z-0 hidden md:block">
              <motion.div 
                style={{ y: floatY1, rotate: floatRotate }}
                className="p-3 sm:p-4 rounded-xl bg-card border border-white/5 shadow-2xl flex items-center gap-3 sm:gap-4 max-w-[180px] sm:max-w-none"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm border-2 border-primary" />
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-primary font-mono font-bold mb-1 tracking-widest uppercase">Retention Mapping</div>
                  <div className="w-16 sm:w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute -right-4 sm:-right-8 bottom-1/3 z-0 hidden md:block">
              <motion.div 
                style={{ y: floatY2, rotate: useTransform(smoothProgress, [0.1, 0.5], [0, -10]) }}
                className="p-3 sm:p-4 rounded-2xl bg-card border border-white/5 shadow-2xl max-w-[140px] sm:max-w-[180px]"
              >
                <div className="text-[8px] sm:text-[10px] text-primary font-mono font-bold mb-2 tracking-widest uppercase">A/B ANGLE GENERATOR</div>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap mt-2">
                  {[
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=100", // Nike
                    "https://images.unsplash.com/photo-1511746315387-c4a76990fdce?auto=format&fit=crop&q=80&w=100", // Adidas
                    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=100", // Puma
                    "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=100", // Google
                    "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=100", // Aesthetic Brand
                    "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=100"  // Aesthetic Brand
                  ].map((url, i) => (
                    <motion.div 
                      key={i} 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-white/5 border border-primary/20 overflow-hidden relative"
                      animate={{ borderColor: ["rgba(34,197,94,0.2)", "rgba(34,197,94,0.6)", "rgba(34,197,94,0.2)"] }}
                      transition={{ duration: 3, delay: i*0.2, repeat: Infinity }}
                    >
                      <img src={url} className="w-full h-full object-cover grayscale opacity-60" alt="" />
                      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Process Labels / Stepper */}
          <div className="mt-8 sm:mt-12 max-w-6xl mx-auto px-2 sm:px-4 shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  className="relative group opacity-100"
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
                      transition={{ duration: 0.5, ease: "easeInOut" }}
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

