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
          {/* Viewport-Fixed Floating Close Button - Always visible & easily reachable on any mobile screen */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[100050] w-11 h-11 rounded-full bg-black/85 hover:bg-black text-white/90 hover:text-white border border-white/25 hover:border-primary/50 flex items-center justify-center shadow-2xl transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#121015] shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[92vh]"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-white/10 bg-white/[0.03] shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {video.categoryLabel}
                </span>
                <h3 className="font-heading font-bold text-white text-xs sm:text-sm md:text-base tracking-wide truncate">
                  {video.title}
                </h3>
              </div>

              {/* In-header close button */}
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Plug-and-Play Video Canvas */}
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
                  className="w-full max-h-[48vh] sm:max-h-[60vh] object-contain bg-black block mx-auto"
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

            {/* Bottom Meta & Call To Action */}
            <div className="p-4 sm:p-5 bg-[#141117] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 overflow-y-auto overscroll-contain">
              <div className="space-y-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-primary font-semibold tracking-wider uppercase font-mono">
                  Direct Response Case File · {video.client || "Client Campaign"}
                </p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                  {video.description}
                </p>
                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
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
              </div>

              <div className="shrink-0 pt-1 sm:pt-0">
                <a
                  href="https://calendly.com/nucleuscreates/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-sm"
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
