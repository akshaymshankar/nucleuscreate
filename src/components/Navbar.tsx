import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nucleusPremiumLogo from "@/assets/nucleus-premium-logo.png";

const navLinks = [
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
          className="flex items-center gap-2 sm:gap-3 font-heading text-base sm:text-lg font-bold tracking-wide text-foreground hover:text-primary transition-colors duration-300"
          data-cursor-hover
        >
          <motion.img
            src={nucleusPremiumLogo}
            alt="Nucleus logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-primary/25"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
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

        {/* Mobile toggle and Apply button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="#apply"
            className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.3)]"
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
    </nav>
  );
};

export default Navbar;
