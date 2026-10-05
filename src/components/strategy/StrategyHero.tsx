import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Volume2, VolumeX, Sparkles, MoreHorizontal } from "lucide-react";
import { VideoItem } from "./VideoModal";

interface StrategyHeroProps {
  onOpenVideo: (video: VideoItem) => void;
  isModalOpen?: boolean;
}

const heroVideo: VideoItem = {
  id: "hero-scalpcare",
  title: "ScalpCare: Direct Response Haircare Narrative",
  category: "ai",
  categoryLabel: "AI Generated with Editing",
  src: "/video-assets/AI_1.mp4",
  client: "ScalpCare Pro",
  description: "High-retention direct response video ad illustrating hair and scalp nourishment with photorealistic human talent synthesis and conversion-focused framing.",
  tags: ["Haircare", "DirectResponse", "AI Generated with Editing"],
};

interface HeroPhoneMockupProps {
  video: VideoItem;
  onOpen: () => void;
  isModalOpen?: boolean;
}

function HeroPhoneMockup({ video, onOpen, isModalOpen }: HeroPhoneMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pause and mute when modal is opened
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      setIsMuted(true);
    } else if (!isModalOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isModalOpen]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.defaultMuted = true;
    el.muted = true;

    const playVideo = () => {
      if (!el) return;
      el.muted = true;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const resume = () => {
            el.play().catch(() => {});
          };
          window.addEventListener("click", resume, { once: true, passive: true });
          window.addEventListener("touchstart", resume, { once: true, passive: true });
          window.addEventListener("scroll", resume, { once: true, passive: true });
        });
      }
    };

    playVideo();

    el.addEventListener("loadedmetadata", playVideo);
    el.addEventListener("loadeddata", () => {
      setIsLoaded(true);
      playVideo();
    });
    el.addEventListener("canplay", () => {
      setIsLoaded(true);
      playVideo();
    });

    return () => {
      el.removeEventListener("loadedmetadata", playVideo);
      el.removeEventListener("loadeddata", playVideo);
      el.removeEventListener("canplay", playVideo);
    };
  }, [video.src]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative mx-auto w-[270px] sm:w-[310px] md:w-[340px] lg:w-[360px] group">
      {/* Studio Keynote Backlight Atmosphere */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-white/10 via-primary/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Titanium Hardware Chassis Frame */}
      <div
        className="relative rounded-[3.2rem] p-[3px] bg-gradient-to-b from-white/30 via-white/10 to-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer"
        onClick={onOpen}
      >
        <div className="rounded-[3.05rem] bg-[#121115] p-2.5 overflow-hidden">
          {/* 9:16 Aspect Video Screen */}
          <div className="relative aspect-[9/16] rounded-[2.6rem] overflow-hidden bg-black flex items-center justify-center">
            {/* Top Dynamic Island */}
            <div className="absolute top-2.5 inset-x-0 z-20 flex justify-center pointer-events-none">
              <div className="w-24 h-4 bg-black/95 backdrop-blur-md rounded-full border border-white/15 flex items-center justify-end px-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
            </div>

            {/* Loading Shimmer Skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-[#16141a] flex flex-col items-center justify-center z-10 animate-pulse">
                <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-2" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Loading...
                </span>
              </div>
            )}

            <video
              ref={videoRef}
              key={video.id + video.src}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setIsLoaded(true)}
              onCanPlay={() => setIsLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={video.src} type="video/mp4" />
            </video>

            {/* Gradient Overlay for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

            {/* Top Header Bar */}
            <div className="absolute top-8 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-black/60 backdrop-blur-md text-white/90 border border-white/15 flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Featured Project
              </span>

              <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-primary transition-colors shadow-md"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-primary" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <div className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/70">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Center Big Frosted Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 group-hover:bg-black/60 transition-transform">
                <Play className="w-5 h-5 fill-white text-white" />
              </div>
            </div>

            {/* Bottom Meta & Scrub Strip */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 pointer-events-none z-10 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/50 block font-semibold">
                    SCALPCARE PRO
                  </span>
                  <h4 className="font-heading font-semibold text-white text-xs sm:text-sm truncate">
                    Direct Response Haircare
                  </h4>
                </div>

                <span className="text-[11px] font-mono text-white/50 shrink-0 font-medium">
                  01:24
                </span>
              </div>

              {/* 4 Video Scrub Frame Thumbnails */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5 pt-2 border-t border-white/10">
                {[
                  { label: "Hook", time: "0:02" },
                  { label: "Problem", time: "0:25" },
                  { label: "Product", time: "0:58" },
                  { label: "Offer", time: "1:24" },
                ].map((thumb, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-md overflow-hidden border border-white/15 bg-white/[0.06] group-hover:border-white/30 transition-colors"
                  >
                    <video
                      src={video.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-white/80 font-bold">
                      {thumb.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StrategyHero({ onOpenVideo, isModalOpen }: StrategyHeroProps) {
  return (
    <section id="overview" className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden border-b border-white/10 bg-[#0B0A0D]">
      {/* Clean Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & High Clarity Message */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Category Kicker */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.28em] text-white/50 uppercase font-mono font-medium mb-6 sm:mb-8">
              <span>AI VIDEO</span>
              <span className="text-white/30">•</span>
              <span>STRATEGY</span>
              <span className="text-white/30">•</span>
              <span>PRODUCTION</span>
            </div>

            {/* Apple-Scale Display Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-[-0.04em] text-white leading-[1.04] text-balance">
              We don't just<br />make AI videos.
            </h1>

            {/* High-Clarity Sub-headline with Highlighted Badge */}
            <h2 className="mt-5 sm:mt-7 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-medium tracking-tight text-white leading-[1.2] text-balance">
              We make videos that feel{" "}
              <span className="inline-block bg-primary text-black font-extrabold px-2.5 sm:px-3 py-0.5 rounded-lg sm:rounded-xl shadow-sm">
                right
              </span>{" "}
              for your brand.
            </h2>

            {/* Narrative Subhead */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/60 max-w-xl font-body leading-relaxed">
              From strategy to final cut — live-action, AI-generated, or hybrid. One team. One process.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto lg:mx-0">
              <a
                href="https://calendly.com/nucleuscreates/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full bg-primary hover:brightness-110 text-black font-heading font-bold text-sm tracking-normal shadow-md active:scale-[0.98] transition-all"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#work"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white font-heading font-semibold text-sm tracking-normal transition-all"
              >
                <span>View Client Work</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Keynote Phone Mockup */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPhoneMockup
              video={heroVideo}
              onOpen={() => onOpenVideo(heroVideo)}
              isModalOpen={isModalOpen}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

