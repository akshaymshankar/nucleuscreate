import { useState, useEffect } from "react";
import StrategyNav from "@/components/strategy/StrategyNav";
import StrategyHero from "@/components/strategy/StrategyHero";
import FormatsSection from "@/components/strategy/FormatsSection";
import WorkShowcase from "@/components/strategy/WorkShowcase";
import ProcessTimeline from "@/components/strategy/ProcessTimeline";
import ComparisonMatrix from "@/components/strategy/ComparisonMatrix";
import GuaranteeSection from "@/components/strategy/GuaranteeSection";
import TestimonialsAndFaq from "@/components/strategy/TestimonialsAndFaq";
import StrategyCta from "@/components/strategy/StrategyCta";
import VideoModal, { VideoItem } from "@/components/strategy/VideoModal";
import useSmoothScroll from "@/hooks/use-smooth-scroll";

export default function AiVideoStrategy() {
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // SEO Optimization & Title Management
  useEffect(() => {
    document.title = "AI Video Strategy & Multi-Format Production — Nucleus Productions";

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "We don't just make AI videos. We make the video that's right for your brand across Live-Action, AI-Generated, and Motion Graphics video. One team, one process."
      );
    }

    // Scroll to top on mount if no hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Structured JSON-LD Schema injection
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "nucleus-strategy-schema";
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://nucleuscreate.in/services/ai-video-strategy#service",
          "name": "AI Video Strategy & Hybrid Commercial Production",
          "serviceType": "Video Production & Direct-Response Advertising",
          "provider": {
            "@type": "Organization",
            "name": "Nucleus Productions",
            "url": "https://nucleuscreate.in",
          },
          "description":
            "Pre-production, production, and post across live-action, AI-generated, and motion graphics video. Fast turnaround, high-retention direct response advertising.",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Production Formats",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI-Generated Video Ads",
                },
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Live-Action Production",
                },
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "3D Motion Graphics & CGI",
                },
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Hybrid Generative Compositing",
                },
              },
            ],
          },
        },
      ],
    });

    document.head.appendChild(schemaScript);

    return () => {
      const existing = document.getElementById("nucleus-strategy-schema");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0A0D] text-[#F5F3EF] selection:bg-[#f2542d]/30 selection:text-white font-body antialiased">
      {/* Top Floating Glass Navigation */}
      <StrategyNav />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Hero Section */}
        <StrategyHero onOpenVideo={(video) => setSelectedVideo(video)} />

        {/* 4 Formats Interactive Grid */}
        <FormatsSection />

        {/* Work Showcase / Portfolio Reel */}
        <WorkShowcase onOpenVideo={(video) => setSelectedVideo(video)} />

        {/* 5-Step Process Timeline */}
        <ProcessTimeline />

        {/* Comparison Matrix: Nucleus vs AI-Only vs Traditional */}
        <ComparisonMatrix />

        {/* Triple Guarantee & Onboarding Requirements */}
        <GuaranteeSection />

        {/* Social Proof Testimonials & FAQ Accordion */}
        <TestimonialsAndFaq />

        {/* Final High-Conversion CTA & Luxury Footer */}
        <StrategyCta />
      </main>

      {/* Cinema Fullscreen Lightbox Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
