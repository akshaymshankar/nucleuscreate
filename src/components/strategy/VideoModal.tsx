import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

export interface VideoItem {
  id: string;
  title: string;
  category: "ai" | "live" | "motion" | "hybrid";
  categoryLabel: string;
  src?: string;
  poster?: string;
  duration?: string;
  client?: string;
  description: string;
  tags?: string[];
  metrics?: string;
}

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [video]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#121015] shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[92vh]"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Single Unified Close Button (top-right corner of the player) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video player"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white/90 hover:text-white border border-white/20 hover:border-primary/50 flex items-center justify-center shadow-xl backdrop-blur-md active:scale-90 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Canvas Area */}
            <div className="relative w-full bg-black flex items-center justify-center overflow-hidden shrink-0">
              {video.src ? (
                <video
                  ref={videoRef}
                  key={video.id + video.src}
                  src={encodeURI(video.src)}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="w-full max-h-[50vh] sm:max-h-[62vh] object-contain bg-black block mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center min-h-[260px]">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-3">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading text-base text-white font-bold">Showcase Creative</h4>
                  <p className="text-white/60 text-xs sm:text-sm mt-1.5 max-w-sm">
                    Campaign asset preview ready for deployment.
                  </p>
                </div>
              )}
            </div>

            {/* Information Section Brought Down Below the Video */}
            <div className="p-4 sm:p-6 bg-[#121015] border-t border-white/10 flex flex-col gap-3 overflow-y-auto overscroll-contain">
              {/* Category Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {video.categoryLabel}
                </span>
              </div>

              {/* Title positioned cleanly below the video */}
              <h3 className="font-heading font-bold text-white text-base sm:text-xl tracking-tight leading-snug">
                {video.title}
              </h3>

              {/* Campaign Description */}
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
                {video.description}
              </p>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-white/5 border border-white/10 text-white/60 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Action CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-[11px] text-white/40 font-mono hidden sm:block">
                  Tailored direct response creative by Nucleus
                </p>
                <a
                  href="https://calendly.com/nucleuscreates/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md"
                >
                  Deploy Similar Ad
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
