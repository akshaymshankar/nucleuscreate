import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Cpu, 
  Clapperboard, 
  Layers, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Sliders,
  FileCheck2,
  Heart,
  MessageSquare,
  Share2,
  Music
} from "lucide-react";

interface FormatItem {
  id: string;
  number: string;
  name: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  icon: typeof Camera;
  headline: string;
  summary: string;
  videoSrc: string;
  reelMeta: {
    handle: string;
    audioTrack: string;
    likes: string;
    comments: string;
    shares: string;
  };
  metrics: {
    turnaround: string;
    scale: string;
    masterCodec: string;
    creativeLine: string;
  };
  capabilities: {
    title: string;
    description: string;
  }[];
  idealFor: string;
}

const formats: FormatItem[] = [
  {
    id: "live",
    number: "01",
    name: "Live-Action Production",
    tag: "Full Crew & Sets",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    accentColor: "#F59E0B",
    icon: Camera,
    headline: "Real people, tactile product, real-world resonance.",
    summary:
      "Full pre-production to post — concept, scripting, talent casting, studio/location shoot, high-end cinema color grading, and commercial editing. For when your brand needs authentic emotional human connection that AI cannot replicate.",
    videoSrc: encodeURI("/video-assets/Concept_3_Edited_Final Version 4.mp4"),
    reelMeta: {
      handle: "@nucleus.liveaction",
      audioTrack: "Original Score · ARRI 32-Bit Master",
      likes: "28.4K",
      comments: "612",
      shares: "3.2K",
    },
    metrics: {
      turnaround: "10–20 Days",
      scale: "Cinema Master + 15 Vertical Cuts",
      masterCodec: "ProRes 4444 XQ",
      creativeLine: "Dedicated Film Director & DP",
    },
    capabilities: [
      {
        title: "Physical Lifestyle & Talent",
        description: "Curated SAG-eligible actor casting, on-set styling, and bespoke production design.",
      },
      {
        title: "Macro Optics & High-Speed Physics",
        description: "120fps slow-motion capture for tactile liquid splash, cream texture, and product surfaces.",
      },
      {
        title: "Multi-Angle Master Coverage",
        description: "Simultaneous 16:9 hero commercial framing with dedicated 9:16 paid social vertical safe zones.",
      },
      {
        title: "Hollywood Color Finishing",
        description: "Node-based studio DaVinci Resolve grade calibrated for high dynamic range displays.",
      },
    ],
    idealFor: "Hero brand launches, luxury lifestyle e-commerce, physical product showcases, and broadcast TVC.",
  },
  {
    id: "ai",
    number: "02",
    name: "AI-Generated Video",
    tag: "Fast + Infinite Scale",
    tagColor: "text-primary border-primary/30 bg-primary/10",
    accentColor: "#22c55e",
    icon: Cpu,
    headline: "Maximum velocity, fractional cost, 20x variations for paid media.",
    summary:
      "Rapid turnaround, radically lower cost per asset, and infinite visual variations for high-velocity paid social testing. Ideal for DTC product ads, localized UGC-style hooks, seasonal creative refreshes, and rapid iteration at scale.",
    videoSrc: encodeURI("/video-assets/Lord Milano Video 02 [No VO].mp4"),
    reelMeta: {
      handle: "@nucleus.aicinema",
      audioTrack: "Diffusion Latent Audio · 48kHz",
      likes: "42.1K",
      comments: "1.4K",
      shares: "8.9K",
    },
    metrics: {
      turnaround: "5–10 Business Days",
      scale: "20x–50x Creative Testing Variations",
      masterCodec: "ProRes 422 + H.265 Ultra",
      creativeLine: "Direct WhatsApp Video Strategist",
    },
    capabilities: [
      {
        title: "Photoreal AI Interaction Models",
        description: "Physics-accurate digital humans interacting naturally with real branded physical products.",
      },
      {
        title: "Sub-3-Second Retention Hooks",
        description: "Algorithmically engineered visual patterns designed to stop aggressive feed scrolling.",
      },
      {
        title: "Multi-Lingual Voice & Lip-Sync",
        description: "Automated lip-sync translation across 14 languages with native local cadence and accents.",
      },
      {
        title: "Infinite Aspect Reformatting",
        description: "Single-concept render outputs instantly across 9:16 vertical, 1:1 feed, and 16:9 widescreen.",
      },
    ],
    idealFor: "Meta & TikTok high-velocity paid ads, rapid hook testing, localized UGC, and direct-response DTC.",
  },
  {
    id: "motion",
    number: "03",
    name: "Motion Graphics & CGI",
    tag: "3D & Kinetic Animation",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    accentColor: "#10B981",
    icon: Clapperboard,
    headline: "Sleek 3D product renders and kinetic typography without cameras.",
    summary:
      "Animated technical explainers, photorealistic 3D CAD product exploded views, and kinetic typographic masterpieces. For brands that require precision engineering and high-gloss polish without logistical physical shoot constraints.",
    videoSrc: encodeURI("/video-assets/Nemari (s1 v1).mp4"),
    reelMeta: {
      handle: "@nucleus.3dmotion",
      audioTrack: "Octane RTX Spatial Sound",
      likes: "31.9K",
      comments: "740",
      shares: "4.8K",
    },
    metrics: {
      turnaround: "7–14 Business Days",
      scale: "Exploded Diagrams + 10 Motion Cuts",
      masterCodec: "10-Bit 4K Master / Alpha Channel",
      creativeLine: "Senior 3D Artist & Motion Lead",
    },
    capabilities: [
      {
        title: "CAD Exploded Visualizations",
        description: "Deconstruct intricate internal mechanisms with continuous buttery orbital camera paths.",
      },
      {
        title: "PBR Material & Surface Physics",
        description: "Sub-micron surface imperfections, metallic anodization, and accurate glass light refractions.",
      },
      {
        title: "Kinetic UI & Type Choreography",
        description: "Punchy, music-quantized typography that guides audience eye tracking to value props.",
      },
      {
        title: "Volumetric Smoke & Fluid Physics",
        description: "High-density smoke, water droplets, and particle turbulence with zero physical mess.",
      },
    ],
    idealFor: "Consumer electronics, SaaS interfaces, luxury accessories, and technical mechanism showcases.",
  },
  {
    id: "hybrid",
    number: "04",
    name: "Hybrid Compositing",
    tag: "Best of Both Worlds",
    tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    accentColor: "#A855F7",
    icon: Layers,
    headline: "Live-action physical product embedded seamlessly in augmented AI realms.",
    summary:
      "Live-action hero footage composited with generative AI environments and 3D CGI visual effects in a single seamless workflow — real product tactile fidelity surrounded by surreal, captivating visual environments that no traditional set could ever afford.",
    videoSrc: encodeURI("/video-assets/AutoHub_Video_1_V7 [Arabic Captions].mp4"),
    reelMeta: {
      handle: "@nucleus.hybridvfx",
      audioTrack: "Multi-Pass Studio Commercial Mix",
      likes: "58.2K",
      comments: "2.1K",
      shares: "12.4K",
    },
    metrics: {
      turnaround: "10–14 Business Days",
      scale: "Hero Commercial + 8 Modular Hooks",
      masterCodec: "DCI 4K ProRes 4444 Master",
      creativeLine: "Lead VFX Supervisor & Creative Lead",
    },
    capabilities: [
      {
        title: "Sub-Pixel Camera Matchmove",
        description: "Point-cloud camera tracking locks live footage and virtual environments into zero-drift alignment.",
      },
      {
        title: "Generative Realm Synthesis",
        description: "Impossible, breathtaking sci-fi and natural landscapes synthesized to match the physical lens perspective.",
      },
      {
        title: "Physical Light Wrapping",
        description: "Virtual CGI lighting cast across real actor and product edges for indistinguishable blending.",
      },
      {
        title: "Anamorphic Lens Distortion",
        description: "Curated vintage anamorphic lens streaks, chromatic aberration, and authentic 35mm optical grain.",
      },
    ],
    idealFor: "Automotive brands, high-concept fashion, beauty cosmetics, and show-stopping viral performance campaigns.",
  },
];

export default function FormatsSection() {
  const [activeFormatId, setActiveFormatId] = useState("ai");
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeIndex = formats.findIndex((f) => f.id === activeFormatId);
  const activeFormat = formats[activeIndex] || formats[1];

  const handleSelectFormat = (id: string, newIdx: number) => {
    if (id === activeFormatId) return;
    setDirection(newIdx > activeIndex ? 1 : -1);
    setActiveFormatId(id);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [activeFormatId]);

  return (
    <section id="formats" className="relative py-24 sm:py-32 bg-[#0C0B0E] border-b border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format Versatility</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
            One team. Every format your brand actually needs.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 font-body leading-relaxed">
            Most shops force you to pick a lane — AI-only, or an expensive traditional production house.
            We run all four under one roof in native 9:16 paid performance dimensions.
          </p>
        </div>

        {/* Interactive Layout: Left Tabs & Specs | Right Mobile Reels Device */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Format Switcher & Apple Technical Matrix */}
          <div className="lg:col-span-7 space-y-6">
            {/* 4 Interactive Format Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formats.map((fmt, idx) => {
                const isSelected = fmt.id === activeFormatId;
                const Icon = fmt.icon;

                return (
                  <div
                    key={fmt.id}
                    onClick={() => handleSelectFormat(fmt.id, idx)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group select-none ${
                      isSelected
                        ? "bg-[#141815] border-primary/60 shadow-[0_10px_25px_rgba(34,197,94,0.15)]"
                        : "bg-[#121015]/60 border-white/5 hover:border-white/20 hover:bg-[#18151D]/60"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeFormatIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                      />
                    )}

                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? "bg-primary/20 text-primary border-primary/40 shadow-[0_0_12px_rgba(34,197,94,0.3)]"
                            : "bg-white/5 text-white/60 border-white/10 group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-white/40 font-bold">{fmt.number}</span>
                          <h3 className="font-heading font-bold text-white text-sm sm:text-base truncate">
                            {fmt.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-white/60 mt-1 line-clamp-1 leading-snug">
                          {fmt.headline}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Format Deep-Dive Technical Specs & Deliverables */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFormat.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#141217] border border-white/15 relative overflow-hidden shadow-2xl space-y-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header Summary */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                      Format Architecture · {activeFormat.tag}
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      Auto-synced to Reels Feed ↗
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed font-body">
                    {activeFormat.summary}
                  </p>
                </div>

                {/* 4-Column Benchmarks Matrix */}
                <div>
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">
                    Production & Delivery Benchmarks
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-mono uppercase mb-1">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>Turnaround</span>
                      </div>
                      <div className="text-xs sm:text-sm font-heading font-extrabold text-white">
                        {activeFormat.metrics.turnaround}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-mono uppercase mb-1">
                        <Sliders className="w-3 h-3 text-emerald-400" />
                        <span>Scale</span>
                      </div>
                      <div className="text-xs font-heading font-extrabold text-white truncate">
                        {activeFormat.metrics.scale}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-mono uppercase mb-1">
                        <FileCheck2 className="w-3 h-3 text-blue-400" />
                        <span>Master</span>
                      </div>
                      <div className="text-xs font-heading font-extrabold text-white truncate">
                        {activeFormat.metrics.masterCodec}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-mono uppercase mb-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>Director</span>
                      </div>
                      <div className="text-xs font-heading font-extrabold text-white truncate">
                        {activeFormat.metrics.creativeLine}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Deliverables (2x2 Grid) */}
                <div>
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">
                    Core Engineered Deliverables
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeFormat.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <h6 className="font-heading font-bold text-white text-xs">
                            {cap.title}
                          </h6>
                        </div>
                        <p className="mt-1 text-[11px] text-white/60 leading-relaxed pl-5.5">
                          {cap.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                      Best For:
                    </span>
                    <span className="text-xs text-white/80 font-medium truncate max-w-[260px] sm:max-w-xs">
                      {activeFormat.idealFor}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 ml-auto">
                    <a
                      href="https://wa.me/919894443263"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-mono font-bold border border-[#25D366]/30 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href="https://calendly.com/nucleuscreates/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-black text-xs font-heading font-extrabold uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(34,197,94,0.35)] transition-all"
                    >
                      <span>Book Call</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Apple iPhone Reels Mobile Feed Viewport */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Phone Enclosure Outer Frame */}
            <div className="relative w-full max-w-[310px] sm:max-w-[330px] rounded-[48px] bg-gradient-to-b from-[#383340] via-[#211e27] to-[#121016] p-3 border border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(34,197,94,0.15)] ring-1 ring-white/10 select-none">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 w-24 h-5 rounded-full bg-black/95 border border-white/10 flex items-center justify-between px-2.5 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16161e] border border-white/20 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-blue-500/80" />
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* iPhone Inner Screen Frame with 9:16 / 9:19.5 Reels Feed */}
              <div className="relative rounded-[38px] bg-black overflow-hidden aspect-[9/19.2] border border-white/10 flex flex-col justify-between">
                
                {/* Auto-Scrolling Reels Feed Stack */}
                <div className="relative w-full h-full overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={activeFormat.id}
                      custom={direction}
                      initial={{ y: direction > 0 ? "100%" : "-100%", opacity: 0.8 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: direction > 0 ? "-100%" : "100%", opacity: 0.8 }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Native Vertical 9:16 Video */}
                      <video
                        ref={videoRef}
                        key={activeFormat.videoSrc}
                        loop
                        playsInline
                        muted={isMuted}
                        autoPlay
                        className="w-full h-full object-cover"
                      >
                        <source src={activeFormat.videoSrc} type="video/mp4" />
                      </video>

                      {/* Photorealistic Screen Glare Sheen */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />

                      {/* Top Header Controls (Reels bar) */}
                      <div className="absolute top-10 left-0 right-0 px-4 flex items-center justify-between z-30 pointer-events-auto">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono text-white uppercase tracking-wider font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span>{activeFormat.name}</span>
                        </div>

                        <button
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.muted = !isMuted;
                              setIsMuted(!isMuted);
                            }
                          }}
                          className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/70" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      </div>

                      {/* Right-Side Floating Reels Action Column */}
                      <div className="absolute right-3 bottom-20 z-30 flex flex-col items-center gap-4 text-white select-none">
                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-white/90 drop-shadow">
                            {activeFormat.reelMeta.likes}
                          </span>
                        </div>

                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-4.5 h-4.5 text-white fill-white/20" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-white/90 drop-shadow">
                            {activeFormat.reelMeta.comments}
                          </span>
                        </div>

                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Share2 className="w-4.5 h-4.5 text-white" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-white/90 drop-shadow">
                            {activeFormat.reelMeta.shares}
                          </span>
                        </div>

                        {/* Spinning Vinyl Record Disc */}
                        <motion.div
                          animate={{ rotate: isPlaying ? 360 : 0 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="w-9 h-9 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-700 to-neutral-900 border-2 border-white/30 flex items-center justify-center shadow-lg mt-1"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </motion.div>
                      </div>

                      {/* Bottom Reel Caption & Audio Waveform */}
                      <div className="absolute bottom-5 left-3 right-16 z-30 text-white select-none">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-heading font-extrabold text-xs tracking-wide text-white drop-shadow">
                            {activeFormat.reelMeta.handle}
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full bg-primary text-black text-[8px] font-mono font-bold uppercase">
                            FORMAT {activeFormat.number}
                          </span>
                        </div>

                        <p className="text-[11px] text-white/90 font-body line-clamp-2 leading-tight drop-shadow">
                          {activeFormat.headline}
                        </p>

                        <div className="flex items-center gap-1.5 mt-2 text-[9px] font-mono text-white/70">
                          <Music className="w-3 h-3 text-primary animate-pulse shrink-0" />
                          <span className="truncate">{activeFormat.reelMeta.audioTrack}</span>
                        </div>
                      </div>

                      {/* Play/Pause Tap Target & Center Indicator */}
                      <div
                        onClick={() => {
                          if (videoRef.current) {
                            if (isPlaying) videoRef.current.pause();
                            else videoRef.current.play();
                            setIsPlaying(!isPlaying);
                          }
                        }}
                        className="absolute inset-0 z-20 cursor-pointer"
                      >
                        {!isPlaying && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                            <div className="w-14 h-14 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center pl-1 shadow-2xl">
                              <Play className="w-6 h-6 fill-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* iPhone Bottom Home Bar Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-40" />
              </div>
            </div>

            {/* Quick Reel Feed Navigation Indicator */}
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-white/50">
              <span>REELS FEED</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>AUTO-SCROLL ON FORMAT SWITCH</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
