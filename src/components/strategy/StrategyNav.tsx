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
          {/* Left Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#overview" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#bef264] flex items-center justify-center p-0.5 group-hover:shadow-[0_0_15px_rgba(190,242,100,0.5)] transition-shadow">
                <span className="w-2 h-2 rounded-full bg-[#bef264]" />
              </div>
              <span className="font-heading font-black tracking-wider text-white text-base sm:text-lg leading-none uppercase">
                NUCLEUS
              </span>
            </a>
          </div>

          {/* Desktop Nav Anchors */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            <Link
              to="/"
              className="text-xs font-heading font-medium text-white/70 hover:text-white transition-colors"
            >
              Agency
            </Link>
            <a
              href="#work"
              className="text-xs font-heading font-medium text-white/70 hover:text-white transition-colors"
            >
              Work
            </a>
            <a
              href="#compare"
              className="text-xs font-heading font-medium text-white/70 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#process"
              className="text-xs font-heading font-medium text-white/70 hover:text-white transition-colors"
            >
              Process
            </a>
            <a
              href="#guarantee"
              className="text-xs font-heading font-medium text-white/70 hover:text-white transition-colors"
            >
              About
            </a>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="https://calendly.com/nucleuscreates/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#bef264] hover:bg-[#a3e635] text-black font-heading font-bold text-xs tracking-normal shadow-sm hover:brightness-105 active:scale-95 transition-all whitespace-nowrap leading-none"
            >
              <span>Book a Call</span>
              <span className="text-xs font-bold leading-none">→</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white/80 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
