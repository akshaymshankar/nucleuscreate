import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle2, XCircle, ArrowRight, Trophy, HelpCircle } from "lucide-react";

export default function AiChallengePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll listener to detect when user scrolls past the Our Standard (#guarantee) section
  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return;

      const guaranteeSection = document.getElementById("guarantee");
      if (!guaranteeSection) return;

      const rect = guaranteeSection.getBoundingClientRect();
      // When the bottom of the guarantee section has scrolled past the viewport
      if (rect.bottom < window.innerHeight * 0.75) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  // Manage video playback when popup opens/closes
  useEffect(() => {
    if (isOpen) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const resetChallenge = () => {
    setSelectedOption(null);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Floating Re-open Badge Trigger (visible after first trigger when popup is closed) */}
      {hasTriggered && !isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 px-4 py-2.5 rounded-full bg-[#18151D]/90 backdrop-blur-xl border border-primary/40 text-white hover:border-primary shadow-2xl flex items-center gap-2 group cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-heading font-bold text-white group-hover:text-primary transition-colors">
            AI vs Real Challenge 🎯
          </span>
        </motion.button>
      )}

      {/* Pop-up Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#131116] border border-white/15 p-5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 text-white scrollbar-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-colors z-20 cursor-pointer"
                aria-label="Close challenge popup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 font-bold">
                  <Sparkles className="w-3 h-3" />
                  Interactive AI Challenge
                </span>
              </div>

              {/* Main Question */}
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight leading-snug">
                Here's a challenge for you: Find which car is real and which one is AI?
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-body mt-1.5 leading-relaxed">
                Watch the footage below. One car was captured on track with cinema cameras, and the other was synthesized 100% with generative AI.
              </p>

              {/* Video Player Box */}
              <div className="relative mt-4 rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video group">
                <video
                  ref={videoRef}
                  src={encodeURI("/video-assets/AutoHub_Video_1_V7 [Arabic Captions].mp4")}
                  loop
                  muted={isMuted}
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Video Title Tag */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white/90 border border-white/15 font-semibold">
                    AutoHub Motors: Track Battle
                  </span>
                </div>

                {/* Floating Bottom Video Controls */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-primary transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleSound}
                    className="p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-mono"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] text-white/70">Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] text-white/70">Muted</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Challenge Options */}
              <div className="mt-5 space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 font-bold block mb-1">
                  Which one is AI? Choose your answer:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: Corvette */}
                  <button
                    type="button"
                    onClick={() => setSelectedOption("A")}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      selectedOption === "A"
                        ? "bg-amber-500/10 border-amber-500 text-white shadow-lg"
                        : selectedOption === "B"
                        ? "bg-white/[0.02] border-white/10 opacity-70 text-white/70"
                        : "bg-[#18151D] border-white/10 hover:border-primary/40 hover:bg-white/[0.04] text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center font-mono font-bold text-xs">
                        A
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm sm:text-base">Corvette</div>
                        <div className="text-[10px] text-white/50 font-mono">Stingray V8</div>
                      </div>
                    </div>

                    {selectedOption === "A" && (
                      <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-amber-400" />
                        A is Real
                      </span>
                    )}
                  </button>

                  {/* Option B: Camry */}
                  <button
                    type="button"
                    onClick={() => setSelectedOption("B")}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      selectedOption === "B"
                        ? "bg-primary/15 border-primary text-white shadow-[0_0_25px_rgba(37,211,102,0.25)]"
                        : selectedOption === "A"
                        ? "bg-primary/10 border-primary/50 text-white"
                        : "bg-[#18151D] border-white/10 hover:border-primary/40 hover:bg-white/[0.04] text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center font-mono font-bold text-xs">
                        B
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm sm:text-base">Camry</div>
                        <div className="text-[10px] text-white/50 font-mono">Sedan Model</div>
                      </div>
                    </div>

                    {selectedOption && (
                      <span className="text-xs font-mono font-bold text-primary flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        B is AI
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Reveal Explanation & Conversion Section */}
              <AnimatePresence>
                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 pt-4 border-t border-white/10 space-y-4"
                  >
                    {/* Explanation Box */}
                    <div className="p-4 rounded-2xl bg-[#1a1720] border border-white/10">
                      <div className="flex items-start gap-2.5">
                        {selectedOption === "B" ? (
                          <Trophy className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-heading font-bold text-sm sm:text-base text-white">
                            {selectedOption === "B"
                              ? "Correct! 🎉 You nailed it!"
                              : "Almost! The Corvette is 100% REAL footage."}
                          </div>
                          <p className="text-xs text-white/75 font-body mt-1 leading-relaxed">
                            <strong className="text-primary font-semibold">B is AI, A is real.</strong> The Corvette was filmed live-action on a runway with cinema camera setups. The Toyota Camry was generated 100% synthetically using our generative AI engine and seamlessly composited into the chase!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Question & Call to Action */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-heading font-bold text-sm text-white">
                          Did you find this interesting?
                        </div>
                        <p className="text-xs text-white/60 font-body">
                          Let's craft high-impact AI & hybrid commercial videos for your brand.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href="https://calendly.com/nucleuscreates/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full bg-primary text-black font-heading font-bold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md"
                        >
                          <span>Book a Call</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={resetChallenge}
                          className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono transition-colors"
                          title="Try again"
                        >
                          ↻
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
