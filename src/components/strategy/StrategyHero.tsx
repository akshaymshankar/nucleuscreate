import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Volume2, VolumeX, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { VideoItem } from "./VideoModal";

interface StrategyHeroProps {
  onOpenVideo: (video: VideoItem) => void;
}

const heroVideoData: VideoItem = {
  id: "hero-woo",
  title: "WOO — Premium Fragrance Tester Kit",
  category: "ai",
  categoryLabel: "AI Direct Response",
  src: "/video-assets/WOO_CONCEPT_7_V5.mp4",
  client: "WOO Fragrance",
  description: "High-velocity AI product showcase with photorealistic lighting, tactile liquid dynamics, and retention-focused vertical composition.",
  tags: ["AI-Generated", "ProductAd", "UGC", "DirectResponse"],
};

const newsFeedBrands = [
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

export default function StrategyHero({ onOpenVideo }: StrategyHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section id="overview" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-white/10 bg-[#0B0A0D]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-[#f2542d]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[600px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pill Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f2542d] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/80 font-medium">
                Live-Action · AI · Motion Graphics · Hybrid
              </span>
            </div>

            {/* Apple-Scale Display Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white leading-[1.03] text-balance">
              We don't just make AI videos.{" "}
              <span className="bg-gradient-to-r from-white via-white/95 to-[#f2542d] bg-clip-text text-transparent">
                We make the video that's right for your brand.
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/65 max-w-2xl font-body leading-relaxed">
              Pre-production, production, and post — across live-action, AI-generated, and motion graphics video.
              One team, one process, no juggling three vendors.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto">
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

            {/* Trust Checklist Badges */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div className="flex flex-col">
                <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Formats</span>
                <span className="font-heading font-black text-xl text-white mt-0.5">4 in-house</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Avg. Delivery</span>
                <span className="font-heading font-black text-xl text-white mt-0.5">7–14 days</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Revisions</span>
                <span className="font-heading font-black text-xl text-[#f2542d] mt-0.5">Guaranteed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Point of Contact</span>
                <span className="font-heading font-black text-xl text-white mt-0.5">1 Dedicated</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Video Showcase */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Device Frame */}
            <div className="relative mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
              {/* Floating Quality Pill at Top-Right */}
              <motion.div
                className="absolute -top-3.5 -right-3.5 sm:-right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17141A]/95 backdrop-blur-xl border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.8)] pointer-events-none"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-white">4K 60FPS</span>
                <span className="text-[10px] font-mono text-[#f2542d] font-semibold border-l border-white/15 pl-1.5">UGC</span>
              </motion.div>

              {/* Outer Decorative Halo */}
              <div className="absolute -inset-1 rounded-[2.8rem] bg-gradient-to-b from-[#f2542d]/30 via-white/10 to-transparent blur-md" />

              {/* Hardware Bezel */}
              <div
                className="relative rounded-[2.6rem] p-[3px] bg-gradient-to-b from-white/30 via-white/10 to-white/20 shadow-2xl overflow-hidden cursor-pointer group"
                onClick={() => onOpenVideo(heroVideoData)}
              >
                <div className="rounded-[2.4rem] bg-[#141217] p-2 overflow-hidden">
                  {/* 9:16 Aspect Video Container */}
                  <div className="relative aspect-[9/16] rounded-[2rem] overflow-hidden bg-black">
                    {/* Top Notch / Dynamic Island */}
                    <div className="absolute top-2 inset-x-0 z-20 flex justify-center pointer-events-none">
                      <div className="w-24 h-4 bg-black/90 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-end px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      </div>
                    </div>

                    <video
                      ref={videoRef}
                      src={encodeURI("/video-assets/WOO_CONCEPT_7_V5.mp4")}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay for controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                    {/* Top Floating Pill */}
                    <div className="absolute top-7 inset-x-4 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#f2542d] border border-white/15 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Featured Ad Reel
                      </span>

                      <button
                        type="button"
                        onClick={toggleSound}
                        className="pointer-events-auto p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#f2542d] transition-colors"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-[#f2542d]" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Bottom Meta */}
                    <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 pointer-events-none z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#f2542d] uppercase tracking-wider font-semibold">
                            WOO Fragrance
                          </span>
                          <h4 className="font-heading font-bold text-white text-sm sm:text-base leading-snug">
                            Tester Kit · High Conversion
                          </h4>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-[#f2542d] text-black flex items-center justify-center pl-0.5 shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perfectly Aligned Dock Widget Beneath Device */}
              <motion.div
                className="mt-4 flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#17141A]/95 backdrop-blur-xl border border-white/15 shadow-xl"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#f2542d]/20 border border-[#f2542d]/40 flex items-center justify-center text-[#f2542d] shrink-0">
                    <Zap className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-heading font-extrabold text-white leading-tight">
                      4x Creative Testing Speed
                    </div>
                    <div className="text-[10px] text-white/50 font-mono mt-0.5">
                      Endless hook variations deployed in 48 hours
                    </div>
                  </div>
                </div>

                <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#f2542d]/10 text-[#f2542d] border border-[#f2542d]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  AI Velocity
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Continuous Newsfeed Ticker Tape */}
        <div className="mt-20 pt-8 border-t border-white/10 overflow-hidden">
          <div className="flex items-center justify-between pb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white font-extrabold">
                LIVE CLIENT NEWSFEED
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-white/50 uppercase tracking-widest pl-3 border-l border-white/15">
                Multi-Format Brand Output
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#f2542d] uppercase tracking-wider bg-[#f2542d]/10 border border-[#f2542d]/30 px-3 py-1 rounded-full font-bold">
              Realtime Production Roster
            </span>
          </div>

          {/* Marquee ticker container with smooth continuous motion */}
          <div className="relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex items-center gap-4 whitespace-nowrap will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            >
              {[...newsFeedBrands, ...newsFeedBrands].map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#16131B] border border-white/20 hover:border-[#f2542d]/60 hover:bg-[#201A26] transition-all shadow-md group cursor-default shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2542d] shrink-0" />
                  <span className="font-heading font-black text-xs sm:text-sm text-white tracking-wider uppercase group-hover:text-[#f2542d] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-white/60 border-l border-white/15 pl-2.5">
                    {item.sector}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#f2542d] border border-white/10 uppercase font-semibold">
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
}
