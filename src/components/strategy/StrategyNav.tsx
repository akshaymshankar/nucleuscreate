import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, PhoneCall, Menu, X } from "lucide-react";
import nucleusPremiumLogo from "@/assets/nucleus-premium-logo.png";
import { Link } from "react-router-dom";

const strategyNavLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Compare", href: "#compare" },
  { label: "Guarantees", href: "#guarantee" },
  { label: "FAQ", href: "#faq" },
];

export default function StrategyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <nav
          className={`mx-auto max-w-6xl flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 pointer-events-auto ${
            scrolled
              ? "bg-[#100E12]/90 backdrop-blur-xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
              : "bg-[#17141A]/80 backdrop-blur-md border border-white/10"
          }`}
        >
          {/* Left Brand & Back Link */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors group text-xs font-mono pr-3 border-r border-white/15 whitespace-nowrap"
              title="Return to Main Agency Site"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Agency</span>
            </Link>

            <a href="#overview" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src={nucleusPremiumLogo}
                alt="Nucleus"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-primary/40 group-hover:border-primary transition-colors"
              />
              <span className="font-heading font-black tracking-wide text-white text-base sm:text-lg leading-none uppercase">
                NUCLEUS
              </span>
            </a>
          </div>

          {/* Desktop Nav Anchors */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/10 shrink-0">
            {strategyNavLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 whitespace-nowrap leading-none"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <a
              href="https://wa.me/919894443263"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-white/80 hover:text-white border border-white/15 hover:border-white/30 bg-white/[0.02] transition-all whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://calendly.com/nucleuscreates/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-black font-heading font-bold text-xs tracking-normal hover:brightness-105 active:scale-95 transition-all whitespace-nowrap leading-none shadow-sm"
            >
              <PhoneCall className="w-3 h-3 stroke-[2] hidden sm:inline-block" />
              <span>Book Call</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-white/80 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0B0A0D]/95 backdrop-blur-2xl flex flex-col justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-5 text-center">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-primary font-mono font-semibold pb-4 border-b border-white/10 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Main Agency Site
              </Link>
              {strategyNavLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-2xl font-bold text-white hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <a
                  href="https://calendly.com/nucleuscreates/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-primary text-black font-heading font-extrabold text-sm uppercase tracking-wider hover:brightness-105 active:scale-[0.99] transition-all shadow-sm"
                >
                  Book Strategy Call
                </a>
                <a
                  href="https://wa.me/919894443263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-white/20 text-white font-heading font-semibold text-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
