import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Proof", href: "#proof" },
  { label: "Compare", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Apply", href: "#apply" },
];

// Mini Nucleus Logo for Navbar
const MiniNucleusLogo = () => (
  <svg
    className="w-6 h-6 sm:w-7 sm:h-7"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="miniCorGrad">
        <stop offset="0%" stopColor="hsl(134 68% 45%)" />
        <stop offset="100%" stopColor="hsl(134 68% 35%)" />
      </radialGradient>
      <filter id="miniGlow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Orbit ring 1 */}
    <motion.circle
      cx="16"
      cy="16"
      r="10"
      fill="none"
      stroke="hsl(134 68% 45%)"
      strokeWidth="0.4"
      opacity="0.3"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      transformOrigin="16px 16px"
    />

    {/* Orbit ring 2 */}
    <motion.circle
      cx="16"
      cy="16"
      r="7"
      fill="none"
      stroke="hsl(134 68% 45%)"
      strokeWidth="0.4"
      opacity="0.4"
      animate={{ rotate: -360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      transformOrigin="16px 16px"
    />

    {/* Central core */}
    <circle
      cx="16"
      cy="16"
      r="4"
      fill="url(#miniCorGrad)"
      filter="url(#miniGlow)"
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-surface" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6">
        <a
          href="#"
          className="flex items-center gap-2 sm:gap-3 font-heading text-base sm:text-lg font-bold tracking-wide text-foreground hover:text-primary transition-colors duration-300"
          data-cursor-hover
        >
          <MiniNucleusLogo />
          <span className="hidden sm:inline">NUCLEUS</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, i) => (
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
          ))}
          <motion.a
            href="#apply"
            className="magnetic-btn px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-heading font-semibold hover:opacity-90 transition-all duration-300"
            data-cursor-hover
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Apply for Pilot
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
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
              {navLinks.map((link, i) => (
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
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
