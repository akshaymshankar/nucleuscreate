import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Volume2, VolumeX, Sparkles, CheckCircle2 } from "lucide-react";
import { VideoItem } from "./VideoModal";

interface StrategyHeroProps {
  onOpenVideo: (video: VideoItem) => void;
}

const heroVideo: VideoItem = {
  id: "hero-woo",
  title: "WOO — Premium Fragrance Tester Kit",
  category: "ai",
  categoryLabel: "AI Generated with Editing",
  src: "/video-assets/WOO_CONCEPT_7_V5.mp4",
  client: "WOO Fragrance",
  description: "High-velocity product showcase with photorealistic lighting, tactile liquid dynamics, and retention-focused vertical composition.",
  tags: ["ProductAd", "DirectResponse", "Editing"],
};

interface HeroPhoneMockupProps {
  video: VideoItem;
  onOpen: () => void;
  badgeLabel: string;
}

function HeroPhoneMockup({ video, onOpen, badgeLabel }: HeroPhoneMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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
    el.addEventListener("loadeddata", playVideo);
    el.addEventListener("canplay", playVideo);

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
    <div className="relative mx-auto w-[250px] sm:w-[280px] md:w-[310px] lg:w-[330px] group">
      {/* Dynamic Background Glow Aura */}
      <div className="absolute -inset-2 rounded-[3.2rem] bg-gradient-to-b from-[#f2542d]/30 via-[#f2542d]/10 to-transparent blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Hardware Frame */}
      <div
        className="relative rounded-[3rem] p-[3px] bg-gradient-to-b from-white/35 via-white/15 to-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
        onClick={onOpen}
      >
        <div className="rounded-[2.85rem] bg-[#141217] p-2 overflow-hidden">
          {/* 9:16 Aspect Video Container */}
          <div className="relative aspect-[9/16] rounded-[2.4rem] overflow-hidden bg-black">
            {/* Top Dynamic Island */}
            <div className="absolute top-2.5 inset-x-0 z-20 flex justify-center pointer-events-none">
              <div className="w-24 h-4 bg-black/95 backdrop-blur-md rounded-full border border-white/15 flex items-center justify-end px-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              </div>
            </div>

            <video
              ref={videoRef}
              key={video.id + video.src}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src={video.src} type="video/mp4" />
            </video>

            {/* Gradient Overlay for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

            {/* Top Floating Bar */}
            <div className="absolute top-8 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#f2542d] border border-white/20 flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3" />
                {badgeLabel}
              </span>

              <button
                type="button"
                onClick={toggleSound}
                className="pointer-events-auto p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-white hover:text-[#f2542d] hover:border-[#f2542d]/40 transition-colors shadow-md"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#f2542d]" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-3.5 inset-x-3.5 p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 pointer-events-none z-10 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#f2542d] uppercase tracking-wider font-semibold block truncate">
                    {video.client}
                  </span>
                  <h4 className="font-heading font-bold text-white text-xs sm:text-sm truncate">
                    {video.title.split("—")[1]?.trim() || video.title}
                  </h4>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#f2542d] text-black flex items-center justify-center pl-0.5 shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Play className="w-4 h-4 fill-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StrategyHero({ onOpenVideo }: StrategyHeroProps) {
  return (
    <section id="overview" className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden border-b border-white/10 bg-[#0B0A0D]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-[#f2542d]/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#f2542d]/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & High Visibility Pitch */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-[#f2542d] bg-[#f2542d]/10 border border-[#f2542d]/30 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Video Studio</span>
            </div>

            {/* Apple-Scale Display Headline with Highlighting */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-black tracking-[-0.035em] text-white leading-[1.08] text-balance">
              We don't just make AI videos.{" "}
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-[#f2542d] via-[#ff7a59] to-[#ffaa40] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(242,84,45,0.45)]">
                We make the video that's right for your brand.
              </span>
            </h1>

            {/* High-Clarity Subhead */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/75 max-w-2xl font-body leading-relaxed">
              Pre-production, production, and post — across live-action, AI-generated, and motion graphics video.
              One team, one process, no juggling three vendors.
            </p>

            {/* Key Value Checks */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-white/65 font-mono">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f2542d]" />
                <span>48–72hr Delivery</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f2542d]" />
                <span>Live-Action & AI Mixed</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f2542d]" />
                <span>White-Label Ready</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <a
                href="#book"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#f2542d] text-black font-heading font-extrabold text-sm uppercase tracking-wider overflow-hidden shadow-[0_0_30px_rgba(242,84,45,0.45)] hover:shadow-[0_0_45px_rgba(242,84,45,0.7)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <span>Book a Free Strategy Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/35 text-white font-heading font-semibold text-sm tracking-wide transition-all backdrop-blur-md"
              >
                <span>See The Work</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Single Phone Mockup */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPhoneMockup
              video={heroVideo}
              onOpen={() => onOpenVideo(heroVideo)}
              badgeLabel="Featured Campaign"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
