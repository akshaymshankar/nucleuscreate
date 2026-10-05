import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Mail,
  MessageCircle,
  PhoneCall,
  UserCheck,
  Database,
  EyeOff,
  CheckCircle2,
  ArrowLeft,
  FileText,
  ExternalLink,
  Sparkles,
  Layers,
  Clock,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("leads-usage");

  useEffect(() => {
    document.title = "Privacy Policy — Nucleus Productions | High-Volume Video Creative";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn how Nucleus Productions collects, handles, and uses lead information to contact you for creative strategy, video audits, and pilot production without spam or data resale."
      );
    }

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Inject structured schema
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "nucleus-privacy-schema";
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "url": "https://www.nucleuscreate.in/privacy-policy",
      "description": "Privacy Policy and Lead Data Usage Disclosure for Nucleus Productions.",
      "publisher": {
        "@type": "Organization",
        "name": "Nucleus Productions",
        "url": "https://www.nucleuscreate.in",
        "logo": "https://www.nucleuscreate.in/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-98944-43263",
          "contactType": "customer service",
          "email": "hello@nucleuscreate.in",
        },
      },
    });

    document.head.appendChild(schemaScript);

    return () => {
      const existing = document.getElementById("nucleus-privacy-schema");
      if (existing) existing.remove();
    };
  }, []);

  const sections = [
    { id: "leads-usage", label: "Lead Data & Contact", icon: Send },
    { id: "collection", label: "What We Collect", icon: Database },
    { id: "purpose", label: "How We Use Data", icon: Layers },
    { id: "security", label: "Security & Protection", icon: Lock },
    { id: "third-parties", label: "Sub-Processors", icon: EyeOff },
    { id: "rights", label: "Your Rights & Opt-Out", icon: UserCheck },
    { id: "contact", label: "Contact Us", icon: Mail },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A0D] text-[#F5F3EF] selection:bg-primary/30 selection:text-white font-body antialiased flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 sm:pb-32 relative overflow-hidden">
        {/* Subtle Ambient Background Grid & Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio Overview</span>
            </Link>
          </div>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border-b border-white/10 pb-10 sm:pb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Data Protection & Privacy
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60 text-[11px] font-mono tracking-wider">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Last Updated: October 2026
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] text-balance">
              Privacy <span className="text-primary">Policy.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-3xl font-body leading-relaxed">
              At <strong className="text-white font-medium">Nucleus Productions</strong> ("Nucleus", "we", "us", or "our"),
              we respect your privacy and handle your business and contact data with complete transparency.
              This document clearly explains what data we collect, why we need it, and exactly how we use lead information to contact you regarding video production partnerships and creative audits.
            </p>
          </motion.div>

          {/* Quick Jump Navigation Pill Bar */}
          <div className="my-8 sticky top-20 z-30 bg-[#0B0A0D]/90 backdrop-blur-md py-3 border-y border-white/10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max px-1">
              <span className="text-xs font-mono uppercase tracking-wider text-white/40 mr-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Quick Jump:
              </span>
              {sections.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading font-medium transition-all ${
                      isActive
                        ? "bg-primary text-black font-bold shadow-md shadow-primary/20"
                        : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/10"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-12 sm:space-y-16 mt-10">
            {/* SECTION 1: Featured Highlight on How We Use Lead Data to Contact You */}
            <section
              id="leads-usage"
              className="scroll-mt-32 p-6 sm:p-8 md:p-10 rounded-[2rem] bg-gradient-to-b from-primary/[0.08] via-white/[0.02] to-transparent border-2 border-primary/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-3">
                <Send className="w-4 h-4" />
                <span>Primary Lead Data Disclosure</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                How We Use Lead Data to Contact You
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed font-body">
                When you submit an application, request an AI Video Strategy audit, book a Calendly session, or send an inquiry on our site, you share key professional contact details. We treat this information as strictly confidential. Here is exactly how and why we communicate with you:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                <div className="p-5 rounded-2xl bg-[#121116] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base">
                      1. Direct WhatsApp Outreach
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed font-body">
                      We use your provided mobile/WhatsApp number to initiate direct, 1-on-1 contact from our executive team (+91 98944 43263). This is used to confirm your application details, clarify creative volume requirements, and coordinate quick turnaround pilots without back-and-forth delays.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official Verified Number: +91 98944 43263</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#121116] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base">
                      2. Strategy Session & Creative Audits via Email
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed font-body">
                      We use your business email address to send calendar confirmations, customized competitor ad audits, script proposals, and follow-up briefing documents tailored to your brand's growth goals.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official Sender: hello@nucleuscreate.in</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#121116] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base">
                      3. Discovery & Fit Assessment Calls
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed font-body">
                      If you select a telephone consultation or requested immediate onboarding, our creative directors may call your direct line to review your creative funnel, benchmark references, and delivery deadlines.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-white/50">
                    <span>No automated cold robocalls. High-context human dialog only.</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#121116] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                      <EyeOff className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base">
                      4. Strict Zero-Resale & Zero-Spam Policy
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed font-body">
                      We <span className="text-white font-bold underline decoration-primary/50 underline-offset-2">NEVER</span> sell, rent, monetize, distribute, or broker your lead data or contact information to third-party telemarketers, lead brokers, or external advertising syndicates. Your data is used exclusively by Nucleus Productions.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Guaranteed zero third-party list sharing</span>
                  </div>
                </div>
              </div>

              {/* Instant Opt-Out Notice */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="text-white/80">
                  <strong className="text-white font-semibold">Immediate Opt-Out Freedom:</strong> You can request to stop receiving messages at any point simply by replying <code className="px-1.5 py-0.5 rounded bg-black/60 font-mono text-primary text-xs">STOP</code> on WhatsApp or emailing <code className="px-1.5 py-0.5 rounded bg-black/60 font-mono text-white text-xs">hello@nucleuscreate.in</code>.
                </span>
                <a
                  href="mailto:hello@nucleuscreate.in?subject=Data%20Opt-Out%20Request"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors shrink-0"
                >
                  <Mail className="w-3 h-3 text-primary" />
                  <span>Request Opt-Out</span>
                </a>
              </div>
            </section>

            {/* SECTION 2: Information We Collect */}
            <section id="collection" className="scroll-mt-32 border-t border-white/10 pt-10">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-2">
                <Database className="w-4 h-4" />
                <span>Section 01</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                Information We Collect
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed font-body">
                We only collect data necessary to understand your video creative requirements, produce high-converting commercial assets, and maintain seamless operational communication.
              </p>

              <div className="mt-6 space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    A. Lead Application & Inquiry Data
                  </h3>
                  <ul className="mt-3 text-xs sm:text-sm text-white/70 space-y-2 list-disc list-inside leading-relaxed font-body">
                    <li><strong className="text-white">Contact Identity:</strong> Full Name, Business Email Address, Phone / WhatsApp Number.</li>
                    <li><strong className="text-white">Company Information:</strong> Agency or Brand Name, Official Website, Social Media Handles, and Industry Vertical.</li>
                    <li><strong className="text-white">Production Scope:</strong> Target monthly video delivery volume (e.g., 1-10, 11-30, 31-50+ videos/month), advertising budget tiers, target channels (Meta, TikTok, YouTube Shorts, TVC), and past advertising performance benchmarks.</li>
                    <li><strong className="text-white">Creative Diagnostic Answers:</strong> Responses to our interactive AI Challenge diagnostic test, video format preferences (Live-Action, AI-Generated with Editing, Motion Graphics), and creative briefing notes.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    B. Technical, Device & Attribution Telemetry
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed font-body">
                    When you access our web application, automated standard logs capture non-sensitive diagnostic telemetry, including:
                  </p>
                  <ul className="mt-2 text-xs sm:text-sm text-white/70 space-y-1.5 list-disc list-inside leading-relaxed font-body">
                    <li>IP address (anonymized/truncated where standard protocols apply) and approximate geographic location (city/country level).</li>
                    <li>Browser user-agent, operating system, and screen viewport dimensions.</li>
                    <li>Campaign UTM parameters (e.g. <code className="text-white/90 font-mono text-[11px]">utm_source</code>, <code className="text-white/90 font-mono text-[11px]">utm_campaign</code>) to measure ad attribution and marketing performance.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: How We Use Collected Data */}
            <section id="purpose" className="scroll-mt-32 border-t border-white/10 pt-10">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-2">
                <Layers className="w-4 h-4" />
                <span>Section 02</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                Purposes & Legal Grounds for Processing
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed font-body">
                We process your information under recognized lawful bases under international privacy frameworks (including GDPR Article 6, CCPA/CPRA, and the Indian Digital Personal Data Protection Act):
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
                    LEGAL BASIS 01
                  </span>
                  <h4 className="font-heading font-bold text-white text-sm">Express Consent</h4>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed font-body">
                    Granted when you voluntarily submit your contact information via our forms, schedule a consultation on Calendly, or initiate a conversation via WhatsApp.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
                    LEGAL BASIS 02
                  </span>
                  <h4 className="font-heading font-bold text-white text-sm">Contract Performance</h4>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed font-body">
                    Necessary to prepare proposals, execute video production agreements, deliver client revisions, coordinate talent/renders, and deliver production assets.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
                    LEGAL BASIS 03
                  </span>
                  <h4 className="font-heading font-bold text-white text-sm">Legitimate Business Interest</h4>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed font-body">
                    Analyzing campaign performance, preventing fraudulent inquiries, enhancing studio pipeline efficiency, and refining video creative algorithms.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: Data Security */}
            <section id="security" className="scroll-mt-32 border-t border-white/10 pt-10">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-2">
                <Lock className="w-4 h-4" />
                <span>Section 03</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                Data Security & Infrastructure Protection
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed font-body">
                We employ industry-standard technical and organizational security controls to protect your data from unauthorized access, alteration, disclosure, or accidental destruction.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">End-to-End Encryption</h4>
                    <p className="mt-1 text-xs text-white/65 leading-relaxed font-body">
                      All website interactions and lead form submissions utilize TLS 1.3 / HTTPS encryption in transit with SHA-256 certificate validation.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">Strict Role-Based Access Control</h4>
                    <p className="mt-1 text-xs text-white/65 leading-relaxed font-body">
                      Lead submissions are strictly accessible only to vetted executive creative directors and account strategists under signed non-disclosure agreements.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">Controlled Storage & Retention</h4>
                    <p className="mt-1 text-xs text-white/65 leading-relaxed font-body">
                      We store records only as long as necessary to fulfill the operational business purpose. Prospective leads that do not convert are securely purged within 24 months.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">Confidential Client Assets</h4>
                    <p className="mt-1 text-xs text-white/65 leading-relaxed font-body">
                      All raw brand assets, product footage, unreleased scripts, and proprietary sales metrics shared with Nucleus are guarded under strict commercial confidentiality.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Sub-Processors & Third Parties */}
            <section id="third-parties" className="scroll-mt-32 border-t border-white/10 pt-10">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-2">
                <EyeOff className="w-4 h-4" />
                <span>Section 04</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                Third-Party Service Providers & Sub-Processors
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed font-body">
                We work with enterprise infrastructure sub-processors strictly to host our application, handle form routing, schedule calendar appointments, and measure ad campaign efficacy:
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left text-xs sm:text-sm font-body">
                  <thead className="border-b border-white/10 bg-white/[0.04] text-white/80 font-heading font-semibold">
                    <tr>
                      <th className="py-3 px-4">Provider</th>
                      <th className="py-3 px-4">Role / Purpose</th>
                      <th className="py-3 px-4 hidden sm:table-cell">Data Handled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/70">
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-white">Google Workspace / Apps Script</td>
                      <td className="py-3.5 px-4">Secure webhook form intake and database management</td>
                      <td className="py-3.5 px-4 hidden sm:table-cell text-white/50">Form field entries, lead email & phone</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-white">Calendly LLC</td>
                      <td className="py-3.5 px-4">Appointment booking for video strategy sessions</td>
                      <td className="py-3.5 px-4 hidden sm:table-cell text-white/50">Name, email, booked session time</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-white">Meta Platforms (WhatsApp)</td>
                      <td className="py-3.5 px-4">Direct business client communication</td>
                      <td className="py-3.5 px-4 hidden sm:table-cell text-white/50">WhatsApp chat correspondence, phone</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-white">Cloudflare / Hosting CDN</td>
                      <td className="py-3.5 px-4">Global edge delivery, DDoS shielding, and DNS routing</td>
                      <td className="py-3.5 px-4 hidden sm:table-cell text-white/50">IP address, request headers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: Your Rights */}
            <section id="rights" className="scroll-mt-32 border-t border-white/10 pt-10">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-2">
                <UserCheck className="w-4 h-4" />
                <span>Section 05</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                Your Rights & Data Choices
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed font-body">
                Regardless of your jurisdiction, we uphold robust privacy rights for every brand and individual who contacts us:
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Access & Portability
                  </h4>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed font-body">
                    You can request a complete copy of all personal and commercial data we hold associated with your name, phone number, or company email.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Erasure ("Right to Be Forgotten")
                  </h4>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed font-body">
                    You can instruct us to permanently purge your lead records, contact numbers, and project files from our active systems without penalty.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Rectification
                  </h4>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed font-body">
                    If your email, phone, or company title has changed, you may update your details at any time by messaging us.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Withdraw Consent
                  </h4>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed font-body">
                    You can revoke consent for WhatsApp or email communications at any moment with immediate effect.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: Contact Information */}
            <section
              id="contact"
              className="scroll-mt-32 border-t border-white/10 pt-10"
            >
              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-[#141815] to-[#0D100E] border border-primary/30 text-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-5 h-5" />
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Contact Our Data Protection Lead
                </h3>

                <p className="mt-3 text-sm sm:text-base text-white/70 max-w-xl mx-auto font-body leading-relaxed">
                  Have questions regarding your data, want to exercise your rights, or verify how your lead inquiry is being processed? Reach out directly.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:hello@nucleuscreate.in?subject=Privacy%20%26%20Data%20Inquiry"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-black font-heading font-bold text-sm tracking-normal hover:brightness-105 active:scale-[0.98] transition-all shadow-md shadow-primary/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>hello@nucleuscreate.in</span>
                  </a>

                  <a
                    href="https://wa.me/919894443263?text=Hi%20Nucleus%20team,%20I%20have%20a%20question%20regarding%20privacy%20and%20data."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-black font-heading font-bold text-sm tracking-normal hover:brightness-105 active:scale-[0.98] transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>WhatsApp: +91 98944 43263</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-xs font-mono text-white/40">
                  <span>Nucleus Productions · https://www.nucleuscreate.in</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
