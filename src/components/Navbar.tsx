import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nucleusPremiumLogo from "@/assets/nucleus-premium-logo.png";

import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const navLinks = [
  { label: "AI Video Strategy", href: "/services/ai-video-strategy", isNew: true, isRouter: true },
  { label: "Proof", href: "#proof" },
  { label: "Compare", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Apply", href: "#apply" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[99999] transition-[background-color,border-color,box-shadow] duration-300 ${isOpen ? 'h-screen bg-background' : ''} ${
        scrolled && !isOpen ? "bg-background/95 backdrop-blur-md border-b border-white/10 shadow-lg" : (!isOpen ? "bg-gradient-to-b from-background/90 to-transparent md:bg-transparent" : "")
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6">
        <a
          href="#"
          className="flex items-center gap-2.5 font-heading text-base sm:text-lg font-black tracking-wider text-foreground hover:text-primary transition-colors duration-300"
          data-cursor-hover
        >
          <motion.img
            src={nucleusPremiumLogo}
            alt="Nucleus logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-primary/25"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <span className="font-heading font-black tracking-wider uppercase text-white">NUCLEUS</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link, i) =>
            link.isRouter ? (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={link.href}
                  className="text-xs sm:text-sm font-heading font-bold text-foreground hover:text-primary transition-all duration-300 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 hover:border-primary/60 group"
                  data-cursor-hover
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform" />
                  <span>{link.label}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-primary text-black font-extrabold uppercase tracking-wider">
                    NEW
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                data-cursor-hover
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.label}
              </motion.a>
            )
          )}

          <a
            href="https://wa.me/919894443263"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-heading font-semibold text-white/80 hover:text-white border border-white/15 hover:border-white/30 bg-white/[0.02] transition-all whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WhatsApp</span>
          </a>

          <motion.a
            href="#apply"
            className="magnetic-btn px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs uppercase font-heading font-bold tracking-wider hover:opacity-90 transition-all duration-300 whitespace-nowrap shadow-sm"
            data-cursor-hover
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Apply for Pilot
          </motion.a>
        </div>

        {/* Mobile toggle and Apply button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="#apply"
            className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider shadow-sm"
          >
            Apply
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-1"
            data-cursor-hover
          >
            <motion.span
              className="w-5 h-px bg-foreground block"
              animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-px bg-foreground block"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-px bg-foreground block"
              animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-0 bg-background z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) =>
                link.isRouter ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <Link
                      to={link.href}
                      className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary text-black font-extrabold uppercase">
                        NEW
                      </span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-3xl font-heading font-bold text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    {link.label}
                  </motion.a>
                )
              )}
              <div className="pt-4 flex flex-col gap-3 w-full max-w-xs">
                <a
                  href="https://wa.me/919894443263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] font-heading font-bold text-center text-sm flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
