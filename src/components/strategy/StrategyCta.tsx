import { MessageCircle, PhoneCall, ArrowRight, ShieldCheck, Mail, Sparkles } from "lucide-react";
import nucleusPremiumLogo from "@/assets/nucleus-premium-logo.png";
import { Link } from "react-router-dom";

export default function StrategyCta() {
  return (
    <>
      <section id="book" className="relative py-24 sm:py-36 bg-[#0B0A0D] border-b border-white/10 overflow-hidden">
        {/* Ambient Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#f2542d]/15 blur-[170px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          <div className="p-8 sm:p-14 md:p-20 rounded-[2.5rem] bg-gradient-to-b from-[#1C1822] via-[#141118] to-[#0E0C11] border border-[#f2542d]/30 shadow-[0_25px_80px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2542d]/10 border border-[#f2542d]/30 text-[#f2542d] text-xs font-mono font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero Risk Creative Strategy</span>
            </div>

            {/* Display Header */}
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] text-balance max-w-3xl mx-auto">
              Ready to deploy video that actually fits your brand?
            </h2>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/65 max-w-2xl mx-auto font-body leading-relaxed">
              Book a free strategy session with our creative directors.
              We will evaluate your acquisition funnel, analyze your competitor creative, and outline the exact format mix that maximizes your return.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/919894443263"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-black font-heading font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-black" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="#apply"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#f2542d] text-black font-heading font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(242,84,45,0.4)] hover:shadow-[0_0_40px_rgba(242,84,45,0.6)] hover:scale-105 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule Strategy Call</span>
              </a>
            </div>

            {/* Trust Micro-Badges */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-white/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#f2542d]" />
                <span>Strict NDA Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2542d]" />
                <span>Format Recommendation Blueprint</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>No High-Pressure Pitch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="bg-[#09080B] py-14 border-t border-white/10 text-white/60">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={nucleusPremiumLogo}
                alt="Nucleus"
                className="w-10 h-10 rounded-full object-cover border border-[#f2542d]/30"
              />
              <div>
                <span className="font-heading font-black text-lg text-white tracking-wide block">
                  NUCLEUS <span className="text-[#f2542d]">Productions</span>
                </span>
                <span className="text-xs font-mono text-white/40">
                  Live-Action · AI · Motion Graphics · Hybrid Compositing
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm font-body">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">
                Agency Home
              </Link>
              <a href="#formats" className="text-white/70 hover:text-white transition-colors">
                Formats
              </a>
              <a href="#work" className="text-white/70 hover:text-white transition-colors">
                Work Reel
              </a>
              <a href="#process" className="text-white/70 hover:text-white transition-colors">
                Process
              </a>
              <a href="#compare" className="text-white/70 hover:text-white transition-colors">
                Comparison
              </a>
              <a href="#faq" className="text-white/70 hover:text-white transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@nucleuscreate.in"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono text-white/80 hover:text-white transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#f2542d]" />
                <span>hello@nucleuscreate.in</span>
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
            <div>© {new Date().getFullYear()} Nucleus Productions. Engineered for high performance brands worldwide.</div>
            <div className="flex items-center gap-4">
              <span>Apple-Grade UX Precision</span>
              <span>•</span>
              <a href="#overview" className="hover:text-white transition-colors">
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Trigger */}
      <a
        href="https://wa.me/919894443263"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-7 h-7 fill-black" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-black" />
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md text-white text-xs font-heading font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl">
          Direct Line with Strategist
        </span>
      </a>
    </>
  );
}
