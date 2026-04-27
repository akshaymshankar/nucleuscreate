import { motion } from "framer-motion";

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
            <img src="/logo.png" alt="Nucleus logo" className="h-10 w-auto" />
            <a
              href="mailto:hello@nucleuscreate.in"
              className="mt-2 inline-block text-sm text-muted-foreground hover:text-primary transition-colors font-body"
              data-cursor-hover
            >
              hello@nucleuscreate.in
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {["Privacy Policy", "Terms of Service"].map((s) => (
              <a
                key={s}
                href="#"
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
            © 2025 Nucleus. All rights reserved.
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-heading">
            White-Label Creative Studio · India
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
