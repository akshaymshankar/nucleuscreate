import React, { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
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

            <h1 className="mt-4 sm:mt-5 font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.12]">
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
                className="block text-primary"
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
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
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-heading font-bold text-xs sm:text-sm tracking-wide border border-white/15 hover:border-primary/40 backdrop-blur-md transition-all group"
                  data-cursor-hover
                >
                  <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                  <span>AI Video Strategy</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold uppercase">
                    NEW
                  </span>
                </Link>
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground/70 px-1">
                Only for brands & agencies testing 20+ creatives a month. Direct strategy support included.
              </span>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground/70 font-heading"
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
                  className="inline-flex items-center gap-x-4 sm:gap-x-8"
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{t}</span>
                  {i < arr.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                  )}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right: Apple MacBook Pro Mockup */}
          <motion.div
            className="relative flex flex-col items-center justify-center mt-6 lg:-mt-16 w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] mx-auto"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-emerald-500/10 to-transparent blur-3xl opacity-50 pointer-events-none" />

            {/* MacBook Pro Display Enclosure (Lid) */}
            <div className="relative w-full rounded-t-[18px] sm:rounded-t-[24px] bg-gradient-to-b from-[#2a2732] via-[#1a1820] to-[#111015] p-2 sm:p-2.5 pb-0 border-t border-x border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(34,197,94,0.1)] ring-1 ring-white/10">
              
              {/* Inner Screen Display (Black Bezel + 16:10 Screen) */}
              <div className="relative rounded-t-[12px] sm:rounded-t-[16px] bg-black overflow-hidden border border-white/10 aspect-[16/10] flex flex-col justify-between">
                
                {/* MacBook Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-20 sm:w-24 h-3 sm:h-3.5 bg-[#08080a] rounded-b-lg border-x border-b border-white/15 flex items-center justify-center gap-2 shadow-md">
                  {/* Camera Lens */}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#181820] border border-white/30 flex items-center justify-center">
                    <span className="w-0.5 h-0.5 rounded-full bg-blue-400/80" />
                  </span>
                  {/* Green Webcam Indicator */}
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* macOS Translucent Top Menu Bar */}
                <div className="relative z-30 px-3 py-1.5 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between text-[9px] sm:text-[10px] text-white/70 font-mono select-none">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-bold text-white tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                      NUCLEUS OS
                    </span>
                    <span className="hidden sm:inline text-white/40">Sequence</span>
                    <span className="hidden sm:inline text-white/40">Render</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 text-[8px] font-mono tracking-wider uppercase font-semibold">
                      4K 60FPS
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX className="w-3 h-3 text-white/70" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
                    </button>
                  </div>
                </div>

                {/* Video Playback Canvas */}
                <div 
                  className="relative flex-1 bg-black overflow-hidden group cursor-pointer"
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
                      handleLoaded();
                    }}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  >
                    <source src="/video.mp4" type="video/mp4" />
                  </video>

                  {/* Photorealistic Screen Glare Sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />

                  {/* Creative loader overlay */}
                  <AnimatePresence>
                    {!videoLoaded && (
                      <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center bg-card/95 backdrop-blur-md"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Animated Nucleus Loading Core SVG */}
                        <svg
                          className="w-20 h-20 sm:w-24 sm:h-24"
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

                        <div className="mt-3 w-1/3 h-0.5 bg-border/30 overflow-hidden rounded-full">
                          <motion.div
                            className="h-full bg-primary"
                            animate={{ width: `${Math.min(loadProgress, 100)}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        </div>
                        <div className="mt-2 text-[8px] tracking-[0.2em] uppercase text-primary font-heading font-semibold">
                          {Math.floor(Math.min(loadProgress, 100))}%
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Play Overlay if paused */}
                  {!isPlaying && videoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all">
                      <div className="w-14 h-14 rounded-full bg-primary/90 text-black flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-black" />
                      </div>
                    </div>
                  )}

                  {/* Scrubber Controls */}
                  <VideoProgressControl 
                    videoRef={videoRef} 
                    isPlaying={isPlaying} 
                    setIsPlaying={setIsPlaying} 
                  />
                </div>
              </div>
            </div>

            {/* MacBook Hinge */}
            <div className="w-[98%] h-1 sm:h-1.5 bg-gradient-to-b from-[#09080c] via-[#16151a] to-[#25232c] border-t border-black/80" />

            {/* MacBook Bottom Base / Keyboard Deck */}
            <div className="relative w-full sm:w-[104%] h-3.5 sm:h-4.5 bg-gradient-to-b from-[#2e2a36] via-[#1d1b24] to-[#121117] rounded-b-[14px] sm:rounded-b-[18px] border-x border-b border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.95)] flex items-start justify-center">
              {/* Display Opening Thumb Groove */}
              <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#09080c] rounded-b-md border-t border-black/70 shadow-inner" />
            </div>

            {/* Laptop Base Table Reflection / Shadow */}
            <div className="w-[85%] h-2 bg-black/70 blur-md rounded-full mt-0.5" />

            {/* Apple Dock Widget Beneath MacBook */}
            <motion.div
              className="mt-4 w-full flex items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-[#141217]/95 backdrop-blur-xl border border-white/15 shadow-xl"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-heading font-extrabold text-white leading-tight truncate">
                    White-Label Video Engine
                  </div>
                  <div className="text-[10px] text-white/50 font-mono mt-0.5 truncate">
                    40 to 100+ high-retention ad cuts / mo
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-white/80 border border-white/10 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  48HR TURNAROUND
                </span>
                <span className="px-2 sm:px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap">
                  AGENCY SCALE
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
