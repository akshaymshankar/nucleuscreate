import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Fast-paced text reveal — words snap in like a jump cut
const SnapText = ({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: any;
}) => {
  const words = text.split(" ");
  const MotionTag = motion(Tag);
  return (
    <MotionTag className={className} initial="hidden" animate="visible">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
              visible: { y: "0%", opacity: 1, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.45,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated load progress for the creative loader
  useEffect(() => {
    if (videoLoaded) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p;
        return p + Math.random() * 8;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [videoLoaded]);

  // Handle video playback and autoplay policy
  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      // Apply current mute state
      videoRef.current.muted = isMuted;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay unmuted blocked by browser. Muting and retrying.", err);
          setIsMuted(true);
        });
      }
    }
  }, [videoLoaded]);

  // Re-sync video mute state when user toggles
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (videoLoaded) {
        videoRef.current.play().catch(e => console.log("Play failed", e));
      }
    }
  }, [isMuted, videoLoaded]);

  // Check if video already cached
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setProgress(100);
      setTimeout(() => setVideoLoaded(true), 300);
    }
  }, []);

  const handleLoaded = () => {
    setProgress(100);
    setTimeout(() => setVideoLoaded(true), 350);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 sm:pt-32 pb-24 sm:pb-32 px-4 sm:px-6"
    >
      {/* Gradient background instead of logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-background pointer-events-none opacity-50" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <motion.span
              className="inline-block text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium border border-primary/20 px-3 py-1.5 rounded-full"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              For Performance Marketing Agencies
            </motion.span>

            <h1 className="mt-4 sm:mt-5 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              <SnapText
                text="Scale your client ad accounts"
                className="block"
                delay={0.15}
                stagger={0.05}
              />
              <SnapText
                text="without hiring more video editors."
                className="block text-primary"
                delay={0.45}
                stagger={0.045}
              />
            </h1>

            <motion.p
              className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-body max-w-xl"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              We are the white-label editing engine powering India's top performance marketing campaigns. Get 40 to 100+ proven, scroll-stopping video ad variations delivered every month.
              <br />
              Zero freelancer headaches.
            </motion.p>

            <motion.div
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-2">
                <a
                  href="#apply"
                  className="magnetic-btn inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full bg-primary text-primary-foreground font-heading text-sm sm:text-base font-semibold tracking-wide hover:opacity-90 transition-all duration-300"
                  data-cursor-hover
                >
                  Apply for a FREE Pilot Video
                  <span className="text-lg leading-none">→</span>
                </a>
                <span className="text-[10px] sm:text-xs text-muted-foreground/70 px-2">
                  Only for agencies testing 20+ creatives a month.
                </span>
              </div>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="mt-8 sm:mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground/60 font-heading"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 1.6 } },
              }}
            >
              {["48hr Delivery", "White-Label", "2,000+ Tier-1 Agencies"].map((t, i, arr) => (
                <motion.span
                  key={t}
                  className="flex items-center gap-x-8"
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{t}</span>
                  {i < arr.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                  )}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right: Video card with creative loader */}
          <motion.div
            className="relative flex items-center justify-center -mt-12 lg:-mt-24"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[480px] rounded-3xl border border-border bg-card overflow-hidden flex flex-col shadow-2xl">
              {/* Header Bar */}
              <div className="px-5 py-2.5 border-b border-border/50 flex justify-between items-center bg-white/[0.03]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-heading">
                  Nucleus / Core
                </div>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-muted-foreground" /> : <Volume2 className="w-3.5 h-3.5 text-foreground" />}
                </button>
              </div>

              {/* Video Area */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  onLoadedData={handleLoaded}
                  onError={(e) => {
                    console.error("Video failed to load", e);
                    handleLoaded(); // dismiss loader even on error
                  }}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                style={{ objectPosition: "center 30%" }}
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* Creative loader overlay (restricted to video area) */}
                <AnimatePresence>
                  {!videoLoaded && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-card backdrop-blur-sm"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Animated Nucleus Loading Core SVG */}
                      <svg
                        className="w-24 h-24 sm:w-28 sm:h-28"
                        viewBox="0 0 120 120"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient id="loadingCoreGrad">
                            <stop offset="0%" stopColor="hsl(134 68% 55%)" />
                            <stop offset="100%" stopColor="hsl(134 68% 35%)" />
                          </radialGradient>
                          <filter id="loadingGlow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <motion.circle cx="60" cy="60" r="35" fill="none" stroke="hsl(134 68% 45%)" strokeWidth="0.8" opacity="0.3" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} transformOrigin="60px 60px" />
                        <motion.circle cx="60" cy="60" r="25" fill="none" stroke="hsl(134 68% 45%)" strokeWidth="0.8" opacity="0.4" animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} transformOrigin="60px 60px" />
                        <motion.circle cx="60" cy="20" r="2.5" fill="hsl(134 68% 45%)" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} transformOrigin="60px 60px" filter="url(#loadingGlow)" />
                        <motion.circle cx="60" cy="60" r="12" fill="url(#loadingCoreGrad)" filter="url(#loadingGlow)" animate={{ r: [12, 14, 12], opacity: [1, 0.8, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
                      </svg>

                      {/* Animated progress bar */}
                      <div className="mt-4 w-1/2 h-0.5 bg-border/30 overflow-hidden rounded-full">
                        <motion.div
                          className="h-full bg-primary"
                          animate={{ width: `${Math.min(progress, 100)}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                      <div className="mt-3 text-[8px] tracking-[0.2em] uppercase text-primary font-heading font-semibold">
                        {Math.floor(Math.min(progress, 100))}%
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Bar */}
              <div className="px-5 py-2.5 border-t border-border/50 flex justify-end items-center bg-white/[0.03]">
                <div className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-primary font-heading">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {videoLoaded ? "Live Feed" : "Connecting"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
