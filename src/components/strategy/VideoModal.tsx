import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " " && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "m" || e.key === "M") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
      setIsPlaying(true);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [video]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-[#100E12] shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/40 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {video.categoryLabel}
                </span>
                <h3 className="font-heading font-bold text-white text-sm sm:text-base tracking-wide truncate max-w-[280px] sm:max-w-md">
                  {video.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-primary" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-[9/16] sm:aspect-video max-h-[60vh] sm:max-h-[66vh] bg-black flex items-center justify-center overflow-hidden group">
              {video.src ? (
                <video
                  ref={videoRef}
                  src={encodeURI(video.src)}
                  autoPlay
                  playsInline
                  controls={false}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-lg text-white font-bold">Showcase Case Study</h4>
                  <p className="text-white/60 text-xs sm:text-sm mt-2 max-w-sm">
                    High-resolution asset preview scheduled for launch. Book a private strategy review to inspect full campaign assets.
                  </p>
                </div>
              )}

              {/* Center Play Overlay on Pause */}
              {!isPlaying && video.src && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                >
                  <div className="w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center pl-1 shadow-xl transition-transform hover:scale-110">
                    <Play className="w-7 h-7 fill-black" />
                  </div>
                </div>
              )}

              {/* Bottom Scrubber Bar */}
              {video.src && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all duration-150 relative mb-3 overflow-hidden"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full relative"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                    <div className="flex items-center gap-3">
                      <button onClick={togglePlay} className="hover:text-white">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <button onClick={toggleMute} className="hover:text-white">
                        {isMuted ? <VolumeX className="w-4 h-4 text-primary" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => videoRef.current?.requestFullscreen()}
                        className="hover:text-white"
                        aria-label="Full screen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Meta & Breakdown */}
            <div className="p-5 sm:p-6 bg-[#141117] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-primary font-semibold tracking-wider uppercase font-mono">
                  Direct Response Case File · {video.client || "Client Campaign"}
                </p>
                <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
                  {video.description}
                </p>
                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/10 text-white/60 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <a
                  href="https://calendly.com/nucleuscreates/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-primary text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-sm"
                >
                  Deploy Similar Ad
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
