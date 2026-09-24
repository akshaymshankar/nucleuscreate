import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-border/40 py-12 sm:py-16 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Nucleus logo" className="h-9 w-auto" />
              <span className="font-heading font-black text-lg tracking-wider text-white">NUCLEUS</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
              <a
                href="mailto:hello@nucleuscreate.in"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors font-body flex items-center gap-1.5"
                data-cursor-hover
              >
                <span>hello@nucleuscreate.in</span>
              </a>
              <span className="hidden sm:inline text-white/20">•</span>
              <a
                href="https://wa.me/919894443263"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-[#25D366] hover:brightness-125 transition-colors font-body flex items-center gap-1.5 font-semibold"
                data-cursor-hover
              >
                <span>WhatsApp: +91 98944 43263</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/services/ai-video-strategy"
              className="text-xs sm:text-sm text-primary hover:brightness-125 font-heading font-bold transition-colors flex items-center gap-1.5"
            >
              <span>AI Video Strategy</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase font-extrabold">
                NEW
              </span>
            </Link>
            {["Proof", "Services", "Pricing", "Apply"].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                data-cursor-hover
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground/70 font-body">
            © {new Date().getFullYear()} Nucleus Productions. All rights reserved.
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-heading">
            White-Label Creative Studio · High-Volume Video Production
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
