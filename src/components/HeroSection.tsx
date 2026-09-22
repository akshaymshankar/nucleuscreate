import React, { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Sparkles, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Fast-paced text reveal — words snap in like a jump cut
const SnapText = memo(({
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
});
SnapText.displayName = "SnapText";

const VideoProgressControl = ({ 
  videoRef, 
  isPlaying, 
  setIsPlaying 
}: { 
  videoRef: React.RefObject<HTMLVideoElement>,
  isPlaying: boolean,
  setIsPlaying: (playing: boolean) => void
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const update = () => {
      if (!isDragging && video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
      setDuration(video.duration || 0);
    };

    video.addEventListener("timeupdate", update);
    video.addEventListener("loadedmetadata", update);
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("loadedmetadata", update);
    };
  }, [videoRef, isDragging]);

  const handleSeek = (e: React.PointerEvent | PointerEvent) => {
    const video = videoRef.current;
    const bar = barRef.current;
    if (!video || !bar || !video.duration) return;

    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    video.currentTime = pct * video.duration;
    setProgress(pct * 100);
    setCurrentTime(pct * video.duration);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    handleSeek(e);
    if (barRef.current) {
      barRef.current.setPointerCapture(e.pointerId);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      handleSeek(e);
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`absolute bottom-0 left-0 w-full p-4 flex flex-col gap-2.5 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 ${!isPlaying ? 'opacity-100 translate-y-0' : 'translate-y-1 opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100'}`}>
      <div 
        ref={barRef}
        className="h-1 w-full bg-white/20 cursor-pointer relative rounded-full overflow-visible pointer-events-auto group/bar touch-none"
        onPointerDown={handlePointerDown}
      >
        <motion.div 
          className="h-full bg-primary relative rounded-full"
          style={{ width: `${progress}%`, filter: "drop-shadow(0 0 4px hsl(134 68% 45%))" }}
        >
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform" />
        </motion.div>
      </div>
      
      <div className="flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="text-white hover:text-primary transition-colors pointer-events-auto p-2 -ml-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <span className="text-[9px] text-white/90 font-mono tracking-tight select-none">
            {formatTime(currentTime)} <span className="text-white/30 mx-0.5">/</span> {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

const homepageNewsFeedBrands = [
  { name: "BAGGAGE TAXI", sector: "Airport Logistics", format: "Direct Response" },
  { name: "THE OUT", sector: "Luxury Mobility", format: "Live Action" },
  { name: "ARKA LUXE", sector: "Fine Jewelry", format: "Macro 3D" },
  { name: "LORD MILANO", sector: "Haute Parfumerie", format: "AI Cinema" },
  { name: "ORGA BOTANICALS", sector: "Clinical Haircare", format: "UGC Ad" },
  { name: "AUTOHUB MOTORS", sector: "Performance Auto", format: "Hybrid CGI" },
  { name: "NEMARI COUTURE", sector: "Bespoke Leather", format: "3D Product" },
  { name: "THETABODY LABS", sector: "DTC Skincare", format: "Conversion Ad" },
  { name: "SRM DYNAMICS", sector: "3D Hologram", format: "Volumetric VFX" },
  { name: "WORLD OF OUD", sector: "Heritage Fragrance", format: "Storytelling" },
  { name: "WOO FRAGRANCE", sector: "Tester Kit", format: "Viral Hook" },
  { name: "AROMA COSMETICS", sector: "Botanical Beauty", format: "Macro Sim" },
  { name: "PACKMAN", sector: "Custom Packaging", format: "Motion 3D" },
  { name: "DREAM DRIVES", sector: "Supercar Fleet", format: "4K Cinema" },
  { name: "ROSSO VIVO", sector: "Culinary Brand", format: "Brand Film" },
];

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated load progress for the creative loader
  useEffect(() => {
    if (videoLoaded) return;
    const interval = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 92) return p;
        return p + Math.random() * 8;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [videoLoaded]);

  // Handle video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(e => {
        console.warn("Autoplay blocked", e);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, videoLoaded]);

  // Handle video playback and autoplay policy
  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      // Apply current mute state
      videoRef.current.muted = isMuted;
    }
  }, [videoLoaded]);

  // Re-sync video mute state when user toggles
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Check if video already cached
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setLoadProgress(100);
      setTimeout(() => setVideoLoaded(true), 300);
    }
  }, []);

  const handleLoaded = () => {
    setLoadProgress(100);
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
                text="without hiring"
                className="block text-primary"
                delay={0.45}
                stagger={0.045}
              />
              <SnapText
                text="more video editors."
                className="block text-primary whitespace-nowrap"
                delay={0.6}
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
              className="mt-6 sm:mt-8 flex flex-col gap-3"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#apply"
                  className="magnetic-btn inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary text-black font-heading font-extrabold text-sm sm:text-base tracking-wide hover:brightness-110 shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all"
                  data-cursor-hover
                >
                  <span>Apply for FREE Pilot</span>
                  <span className="text-lg leading-none">→</span>
                </a>

                <Link
                  to="/services/ai-video-strategy"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-heading font-bold text-xs sm:text-sm tracking-wide border border-white/15 backdrop-blur-md transition-all group"
                  data-cursor-hover
                >
                  <Sparkles className="w-4 h-4 text-[#f2542d] group-hover:rotate-12 transition-transform" />
                  <span>AI Video Strategy</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[#f2542d]/20 text-[#f2542d] border border-[#f2542d]/30 font-bold uppercase">
                    NEW
                  </span>
                </Link>

                <a
                  href="https://wa.me/919894443263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-heading font-bold text-xs sm:text-sm tracking-wide border border-[#25D366]/30 transition-all"
                  data-cursor-hover
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground/70 px-1">
                Only for brands & agencies testing 20+ creatives a month. Direct strategy support included.
              </span>
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
            className="relative flex items-center justify-center mt-4 lg:-mt-24"
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
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-muted-foreground" /> : <Volume2 className="w-3.5 h-3.5 text-foreground" />}
                  </button>
                </div>
              </div>

              {/* Video Area */}
              <div 
                className="relative aspect-video bg-black overflow-hidden group cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <video
                  ref={videoRef}
                  loop
                  playsInline
                  muted={isMuted}
                  poster="/hero-poster.png"
                  onLoadedData={handleLoaded}
                  onError={(e) => {
                    console.error("Video failed to load", e);
                    handleLoaded(); // dismiss loader even on error
                  }}
                  className="w-full h-full object-cover"
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
                          animate={{ width: `${Math.min(loadProgress, 100)}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                      <div className="mt-3 text-[8px] tracking-[0.2em] uppercase text-primary font-heading font-semibold">
                        {Math.floor(Math.min(loadProgress, 100))}%
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <VideoProgressControl 
                  videoRef={videoRef} 
                  isPlaying={isPlaying} 
                  setIsPlaying={setIsPlaying} 
                />
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

        {/* Continuous Newsfeed Ticker Tape for Homepage */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-border/40 overflow-hidden">
          <div className="flex items-center justify-between pb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping shrink-0" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-foreground font-extrabold">
                LIVE CLIENT NEWSFEED
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground uppercase tracking-widest pl-3 border-l border-border/40">
                Direct Performance Editing Roster
              </span>
            </div>
            <span className="text-[10px] font-mono text-primary uppercase tracking-wider bg-primary/10 border border-primary/30 px-3 py-1 rounded-full font-bold">
              Active Brand Network
            </span>
          </div>

          {/* Marquee ticker container with smooth continuous motion */}
          <div className="relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex items-center gap-4 whitespace-nowrap will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            >
              {[...homepageNewsFeedBrands, ...homepageNewsFeedBrands].map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/80 border border-border/80 hover:border-primary/60 hover:bg-card transition-all shadow-md group cursor-default shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="font-heading font-black text-xs sm:text-sm text-foreground tracking-wider uppercase group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground border-l border-border/60 pl-2.5">
                    {item.sector}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase font-semibold">
                    {item.format}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
