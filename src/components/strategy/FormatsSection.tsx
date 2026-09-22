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
  Maximize2
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
  hudBadge: string;
  telemetry: {
    engine: string;
    specs: string;
    color: string;
    audio: string;
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
    hudBadge: "ARRI ALEXA 35 · CINEMA RIG",
    telemetry: {
      engine: "4.6K Super 35 · Dual Native ISO",
      specs: "T1.3 Prime Lenses · 120 FPS High-Speed",
      color: "ARRI LogC4 / ACES 2065-1 Wide Gamut",
      audio: "32-Bit Float Field Sound Master",
    },
    metrics: {
      turnaround: "10–20 Days",
      scale: "Cinema Master + 15 Vertical Hooks",
      masterCodec: "Apple ProRes 4444 XQ",
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
    tagColor: "text-[#f2542d] border-[#f2542d]/30 bg-[#f2542d]/10",
    accentColor: "#f2542d",
    icon: Cpu,
    headline: "Maximum velocity, fractional cost, 20x variations for paid media.",
    summary:
      "Rapid turnaround, radically lower cost per asset, and infinite visual variations for high-velocity paid social testing. Ideal for DTC product ads, localized UGC-style hooks, seasonal creative refreshes, and rapid iteration at scale.",
    videoSrc: encodeURI("/video-assets/Lord Milano Video 02 [No VO].mp4"),
    hudBadge: "NEURAL DIFFUSION · SORA / KLING HD",
    telemetry: {
      engine: "Proprietary Photoreal Checkpoint v4.2",
      specs: "60 FPS Temporal Consistency Solver",
      color: "Rec.709 DCI-P3 Color Calibrated",
      audio: "Neural Multi-Language Lip Sync",
    },
    metrics: {
      turnaround: "5–10 Business Days",
      scale: "20x–50x Creative Testing Variations",
      masterCodec: "ProRes 422 + MP4 H.265 Ultra",
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
    hudBadge: "OCTANE RTX · CINEMA 4D · UNREAL 5",
    telemetry: {
      engine: "1.4M Quad Polygons · PBR Materials",
      specs: "Hardware Raytraced Caustics & Glass",
      color: "32-Bit Linear OpenEXR Pipeline",
      audio: "Bespoke Spatial Foley Sound Design",
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
    hudBadge: "NUKE MULTI-PASS · NEURAL COMPOSITOR",
    telemetry: {
      engine: "3D Camera Point-Cloud Matchmove",
      specs: "Multi-Channel OpenEXR Deep Compositing",
      color: "ACEScc Unified Studio Color Space",
      audio: "Dynamic Commercial Cinematic Score",
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeFormat = formats.find((f) => f.id === activeFormatId) || formats[1];

  // Sync video play state on format change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [activeFormatId]);

  return (
    <section id="formats" className="relative py-24 sm:py-32 bg-[#0C0B0E] border-b border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#f2542d]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#f2542d] bg-[#f2542d]/10 border border-[#f2542d]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format Versatility</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
            One team. Every format your brand actually needs.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 font-body leading-relaxed">
            Most shops force you to pick a lane — AI-only, or an expensive traditional production house.
            We run all four under one roof, and tell you honestly which format serves your outcome and budget best.
          </p>
        </div>

        {/* Formats Grid / Selector */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Format List */}
          <div className="lg:col-span-4 space-y-3">
            {formats.map((fmt) => {
              const isSelected = fmt.id === activeFormatId;
              const Icon = fmt.icon;

              return (
                <div
                  key={fmt.id}
                  onClick={() => setActiveFormatId(fmt.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group select-none ${
                    isSelected
                      ? "bg-[#18151D] border-[#f2542d]/60 shadow-[0_12px_32px_rgba(242,84,45,0.18)]"
                      : "bg-[#121015]/60 border-white/5 hover:border-white/20 hover:bg-[#18151D]/60"
                  }`}
                >
                  {/* Left accent bar if selected */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeFormatIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f2542d]"
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? "bg-[#f2542d]/20 text-[#f2542d] border-[#f2542d]/40 shadow-[0_0_15px_rgba(242,84,45,0.3)]"
                            : "bg-white/5 text-white/60 border-white/10 group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-white/40 font-bold">{fmt.number}</span>
                          <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                            {fmt.name}
                          </h3>
                        </div>
                        <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed">
                          {fmt.headline}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border whitespace-nowrap shrink-0 hidden sm:inline-block ${fmt.tagColor}`}
                    >
                      {fmt.tag}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Quick Consultation Badge */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-white/80">Need custom format mixing?</span>
              </div>
              <a
                href="https://wa.me/919894443263"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#f2542d] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Chat WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Apple-Grade Studio Viewport & Deep-Dive Inspector */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFormat.id}
                className="rounded-3xl bg-[#141217] border border-white/15 overflow-hidden shadow-2xl relative"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header Bar */}
                <div className="p-5 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black font-mono text-[#f2542d]">{activeFormat.number}</span>
                    <div>
                      <h4 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-tight">
                        {activeFormat.name}
                      </h4>
                      <span className="text-[11px] font-mono text-white/50 tracking-wider uppercase">
                        {activeFormat.hudBadge}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border ${activeFormat.tagColor}`}
                  >
                    {activeFormat.tag}
                  </span>
                </div>

                {/* Interactive Cinema Monitor */}
                <div className="relative aspect-video bg-black overflow-hidden group">
                  <video
                    ref={videoRef}
                    key={activeFormat.videoSrc}
                    loop
                    playsInline
                    muted={isMuted}
                    autoPlay
                    className="w-full h-full object-cover object-center"
                  >
                    <source src={activeFormat.videoSrc} type="video/mp4" />
                  </video>

                  {/* Cinema Corner Reticles */}
                  <div className="pointer-events-none absolute inset-3 sm:inset-4 flex flex-col justify-between select-none">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE REEL PREVIEW</span>
                      </div>

                      <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/90">
                        {activeFormat.telemetry.engine}
                      </div>
                    </div>
                  </div>

                  {/* Centered Play Button Overlay when Paused */}
                  {!isPlaying && (
                    <div 
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.play();
                          setIsPlaying(true);
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#f2542d] text-white flex items-center justify-center pl-1 shadow-[0_0_25px_rgba(242,84,45,0.5)] hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Studio Monitor Telemetry & Control Dock (Rightly Positioned) */}
                <div className="bg-[#0e0c12]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                  {/* Left: Telemetry Details */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/90 font-semibold">
                      {activeFormat.telemetry.specs}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider hidden md:inline">
                      {activeFormat.telemetry.color}
                    </span>
                  </div>

                  {/* Right: Playback Controls */}
                  <div className="flex items-center gap-2 ml-auto shrink-0">
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          if (isPlaying) videoRef.current.pause();
                          else videoRef.current.play();
                          setIsPlaying(!isPlaying);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono transition-colors"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isPlaying ? "Pause" : "Play"}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted;
                          setIsMuted(!isMuted);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/60" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </div>
                </div>

                {/* Deep Technical Specs Grid (replaces plain emojis and text) */}
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Summary Scope */}
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">
                      Format Architecture & Intent
                    </h5>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed font-body">
                      {activeFormat.summary}
                    </p>
                  </div>

                  {/* 4-Column Apple Tech Specs Matrix */}
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">
                      Production & Delivery Benchmarks
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono uppercase mb-1">
                          <Clock className="w-3.5 h-3.5 text-[#f2542d]" />
                          <span>Turnaround</span>
                        </div>
                        <div className="text-sm font-heading font-extrabold text-white">
                          {activeFormat.metrics.turnaround}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono uppercase mb-1">
                          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Scale</span>
                        </div>
                        <div className="text-xs sm:text-sm font-heading font-extrabold text-white truncate">
                          {activeFormat.metrics.scale}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono uppercase mb-1">
                          <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>Master Codec</span>
                        </div>
                        <div className="text-xs sm:text-sm font-heading font-extrabold text-white truncate">
                          {activeFormat.metrics.masterCodec}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono uppercase mb-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Direct Lead</span>
                        </div>
                        <div className="text-xs sm:text-sm font-heading font-extrabold text-white truncate">
                          {activeFormat.metrics.creativeLine}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Engineered Capabilities (2x2 Grid) */}
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">
                      Core Engineered Deliverables
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeFormat.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#f2542d]/40 transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#f2542d] shrink-0" />
                            <h6 className="font-heading font-bold text-white text-xs sm:text-sm group-hover:text-[#f2542d] transition-colors">
                              {cap.title}
                            </h6>
                          </div>
                          <p className="mt-1.5 text-xs text-white/60 leading-relaxed pl-6">
                            {cap.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best Suited & Bottom Call to Action */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="max-w-md">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                        Best Suited For
                      </span>
                      <p className="text-xs text-white/80 font-medium mt-0.5 leading-relaxed">
                        {activeFormat.idealFor}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href="https://wa.me/919894443263"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-mono font-bold border border-[#25D366]/30 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Chat Strategist</span>
                      </a>

                      <a
                        href="#book"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#f2542d] text-white text-xs font-heading font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(242,84,45,0.35)] transition-all"
                      >
                        <span>Book Format Call</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
