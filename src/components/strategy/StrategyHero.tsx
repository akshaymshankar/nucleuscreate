import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Volume2, VolumeX, Sparkles } from "lucide-react";
import { VideoItem } from "./VideoModal";

interface StrategyHeroProps {
  onOpenVideo: (video: VideoItem) => void;
}

const leftHeroVideo: VideoItem = {
  id: "hero-woo",
  title: "WOO — Premium Fragrance Tester Kit",
  category: "ai",
  categoryLabel: "AI Generated with Editing",
  src: "/video-assets/WOO_CONCEPT_7_V5.mp4",
  client: "WOO Fragrance",
  description: "High-velocity product showcase with photorealistic lighting, tactile liquid dynamics, and retention-focused vertical composition.",
  tags: ["ProductAd", "DirectResponse", "Editing"],
};

const rightHeroVideo: VideoItem = {
  id: "hero-thetabody",
  title: "Thetabody — Charcoal Detox Mask",
  category: "ai",
  categoryLabel: "AI Generated with Editing",
  src: "/video-assets/THETABODY_Video_10_V7.mp4",
  client: "Thetabody Labs",
  description: "Skincare product direct response creative illustrating pore-deep cleansing with seamless AI macro close-ups and clinical proof points.",
  tags: ["Skincare", "AI Generated with Editing", "DirectResponse"],
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
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [video.src]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative mx-auto w-[210px] sm:w-[230px] md:w-[245px] lg:w-[250px] xl:w-[260px] group">
      {/* Outer Halo */}
      <div className="absolute -inset-1 rounded-[2.6rem] bg-gradient-to-b from-[#f2542d]/25 via-white/10 to-transparent blur-md opacity-75 group-hover:opacity-100 transition-opacity" />

      {/* Hardware Frame */}
      <div
        className="relative rounded-[2.5rem] p-[2.5px] bg-gradient-to-b from-white/30 via-white/10 to-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden cursor-pointer"
        onClick={onOpen}
      >
        <div className="rounded-[2.35rem] bg-[#141217] p-1.5 overflow-hidden">
          {/* 9:16 Aspect Video Container */}
          <div className="relative aspect-[9/16] rounded-[2rem] overflow-hidden bg-black">
            {/* Top Dynamic Island */}
            <div className="absolute top-2 inset-x-0 z-20 flex justify-center pointer-events-none">
              <div className="w-20 h-3.5 bg-black/95 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-end px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            </div>

            <video
              ref={videoRef}
              src={encodeURI(video.src || "")}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

            {/* Top Floating Bar */}
            <div className="absolute top-6 inset-x-3 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#f2542d] border border-white/15 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                {badgeLabel}
              </span>

              <button
                type="button"
                onClick={toggleSound}
                className="pointer-events-auto p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#f2542d] transition-colors"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#f2542d]" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 pointer-events-none z-10">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[9px] font-mono text-[#f2542d] uppercase tracking-wider font-semibold block truncate">
                    {video.client}
                  </span>
                  <h4 className="font-heading font-bold text-white text-xs truncate">
                    {video.title.split("—")[1]?.trim() || video.title}
                  </h4>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#f2542d] text-black flex items-center justify-center pl-0.5 shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Play className="w-3.5 h-3.5 fill-black" />
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[#f2542d]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[500px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Phone Mockup */}
          <motion.div
            className="hidden lg:flex lg:col-span-3 justify-center lg:justify-end"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPhoneMockup
              video={leftHeroVideo}
              onOpen={() => onOpenVideo(leftHeroVideo)}
              badgeLabel="Direct Response"
            />
          </motion.div>

          {/* Center Column: Typography & CTAs */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-center text-center px-2 sm:px-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Apple-Scale Display Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] text-white leading-[1.05] text-balance">
              We don't just make AI videos.{" "}
              <span className="bg-gradient-to-r from-white via-white/95 to-[#f2542d] bg-clip-text text-transparent">
                We make the video that's right for your brand.
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/65 max-w-2xl font-body leading-relaxed mx-auto">
              Pre-production, production, and post — across live-action, AI-generated, and motion graphics video.
              One team, one process, no juggling three vendors.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#book"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#f2542d] text-black font-heading font-extrabold text-sm uppercase tracking-wider overflow-hidden shadow-[0_0_30px_rgba(242,84,45,0.45)] hover:shadow-[0_0_40px_rgba(242,84,45,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <span>Book a Free Strategy Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-white font-heading font-semibold text-sm tracking-wide transition-all backdrop-blur-md"
              >
                <span>See The Work</span>
              </a>
            </div>

            {/* Mobile / Tablet Dual Phone Mockups Display */}
            <div className="flex lg:hidden items-center justify-center gap-4 sm:gap-6 mt-12 w-full">
              <HeroPhoneMockup
                video={leftHeroVideo}
                onOpen={() => onOpenVideo(leftHeroVideo)}
                badgeLabel="Direct Response"
              />
              <HeroPhoneMockup
                video={rightHeroVideo}
                onOpen={() => onOpenVideo(rightHeroVideo)}
                badgeLabel="Brand Showcase"
              />
            </div>
          </motion.div>

          {/* Right Phone Mockup */}
          <motion.div
            className="hidden lg:flex lg:col-span-3 justify-center lg:justify-start"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPhoneMockup
              video={rightHeroVideo}
              onOpen={() => onOpenVideo(rightHeroVideo)}
              badgeLabel="Brand Showcase"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
