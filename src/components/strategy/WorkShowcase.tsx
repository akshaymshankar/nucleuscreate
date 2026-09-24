import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { VideoItem } from "./VideoModal";

interface WorkShowcaseProps {
  onOpenVideo: (video: VideoItem) => void;
}

const portfolioData: VideoItem[] = [
  {
    id: "woo-tester",
    title: "WOO — Fragrance Tester Kit",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/WOO_CONCEPT_7_V5.mp4",
    client: "WOO",
    description: "High-energy direct response ad featuring tactile bottle textures, mist physics, and conversion-optimized vertical framing for TikTok & Meta ads.",
    tags: ["ProductAd", "Fragrance", "DirectResponse", "Editing"],
  },
  {
    id: "thetabody-detox",
    title: "Thetabody — Charcoal Detox Mask",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/THETABODY_Video_10_V7.mp4",
    client: "Thetabody Labs",
    description: "Skincare product direct response creative illustrating pore-deep cleansing with seamless AI macro close-ups and clinical proof points.",
    tags: ["Skincare", "AI Generated with Editing", "DirectResponse"],
  },
  {
    id: "srm-hologram",
    title: "SRM — 3D Hologram Projection Van",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/SRM video 1 V3.mp4",
    client: "SRM Dynamics",
    description: "High-fidelity 3D projection visual on a mobile installation, synthesized with generative AI pipelines and urban night color grading.",
    tags: ["ProductAd", "VFX", "Automotive", "Editing"],
  },
  {
    id: "lord-milano-riyadh",
    title: "Lord Milano — Riyadh Vibes",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/Lord Milano Video 02 [No VO].mp4",
    client: "Lord Milano",
    description: "Cinematic Gulf elegance and luxury ambiance synthesized entirely through fine-tuned generative AI pipelines with ultra-rich color grading.",
    tags: ["Luxury", "Perfume", "Cinematic", "AI Generated with Editing"],
  },
  {
    id: "world-of-oud",
    title: "World of Oud — The Oud Explainer",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/Concept_3_Edited_Final Version 4.mp4",
    client: "World of Oud",
    description: "Narrative brand exploration following the heritage of sacred resin harvesting to refined luxury flacons, blending historical realism with sleek modern pacing.",
    tags: ["Heritage", "Storytelling", "Fragrance", "AI Generated with Editing"],
  },
  {
    id: "aroma-hairmask",
    title: "Aroma — Intensive Hairmask",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/Aroma_Hairmask_V3.mp4",
    client: "Aroma Cosmetics",
    description: "Lush botanical textures and silky hair strand simulations highlighting natural hydration, engineered for beauty consumers on Reels and TikTok.",
    tags: ["Beauty", "Haircare", "DTC Ad", "AI Generated with Editing"],
  },
  {
    id: "arka-jewellery",
    title: "Arka — The Solitaire Collection",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/ARKA_Video_4_V3.mp4",
    client: "Arka Fine Jewels",
    description: "Micro-facet diamond caustics, gold luster, and refractive dispersion rendered with photoreal precision, rivaling multi-thousand dollar studio macro rigs.",
    tags: ["Jewelry", "Luxury", "Macro 3D", "AI Generated with Editing"],
  },
  {
    id: "autohub-corvette",
    title: "AutoHub — Corvette Stingray vs. Camry",
    category: "hybrid",
    categoryLabel: "Hybrid & AI",
    src: "/video-assets/AutoHub_Video_1_V7 [Arabic Captions].mp4",
    client: "AutoHub Motors",
    description: "Adrenaline-fueled automotive battle featuring live-action vehicular staging augmented with high-speed AI track compositing and native Arabic subtitles.",
    tags: ["Automotive", "Hybrid", "Localization"],
  },
  {
    id: "nemari-vanity",
    title: "Nemari — Bespoke Leather Vanity Case",
    category: "ai",
    categoryLabel: "AI Generated with Editing",
    src: "/video-assets/Nemari (s1 v1).mp4",
    client: "Nemari",
    description: "Detailed craftsmanship render emphasizing hand-stitched grain, golden clasps, and modular interior trays in a sophisticated product showcase.",
    tags: ["ProductAd", "Fashion", "AI Generated with Editing"],
  },
];

const filterCategories = [
  { id: "all", label: "All Work" },
  { id: "ai", label: "AI Generated with Editing" },
  { id: "hybrid", label: "Hybrid" },
];

export default function WorkShowcase({ onOpenVideo }: WorkShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredVideos = portfolioData.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-[#0B0A0D] border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/25 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Output</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Ship creative that proves the range.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/60 font-body">
              Filter by format — every showcase here is a tangible campaign asset executed by our team,
              reflecting our standard in video production and editing.
            </p>
          </div>

          {/* Filter Pills with touch-friendly mobile horizontal scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              const count =
                cat.id === "all"
                  ? portfolioData.length
                  : portfolioData.filter((v) => v.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-primary text-black font-extrabold shadow-sm"
                      : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-black/25 text-black font-extrabold" : "bg-white/10 text-white/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Cards Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredVideos.map((item) => (
              <VideoCard key={item.id} item={item} onOpen={() => onOpenVideo(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function VideoCard({ item, onOpen }: { item: VideoItem; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.src) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && item.src) {
      videoRef.current.pause();
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#141217] hover:border-primary/50 transition-all duration-300 shadow-lg flex flex-col cursor-pointer"
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 4:5 / 9:16 Video Canvas Area */}
      <div className="relative aspect-[4/5] bg-black overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={encodeURI(item.src || "")}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100E12] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Bar Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-primary border border-white/15">
            {item.categoryLabel}
          </span>
        </div>

        {/* Floating Audio Toggle (on card hover) */}
        {isHovered && (
          <button
            type="button"
            onClick={toggleSound}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-primary transition-colors"
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-primary" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Center Play Icon Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center pl-1 group-hover:bg-primary group-hover:text-black group-hover:scale-115 transition-all duration-300 shadow-xl">
            <Play className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Card Info Meta */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#141217]">
        <div>
          <h4 className="font-heading font-bold text-white text-base sm:text-lg tracking-tight group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </h4>
          <p className="text-xs text-white/60 font-body mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.03] text-white/50 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
