import { Suspense, lazy } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import useSmoothScroll from "@/hooks/use-smooth-scroll";

const PhilosophySection = lazy(() => import("@/components/PhilosophySection"));
const AssemblyVisuals = lazy(() => import("@/components/AssemblyVisuals"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ApplyFormSection = lazy(() => import("@/components/ApplyFormSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useSmoothScroll();

  return (
    <div className="bg-background min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[60] pointer-events-none">
        <a
          href="#apply"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary text-primary-foreground font-heading text-sm font-semibold tracking-wide shadow-[0_4px_30px_rgba(34,197,94,0.35)] border border-primary/20 pointer-events-auto transition-transform active:scale-95"
        >
          Apply for a FREE Pilot Video
          <span className="text-lg leading-none">→</span>
        </a>
      </div>

      <Suspense fallback={<div className="h-96 bg-background" />}>
        <PhilosophySection />
        <ProcessSection />
        <ServicesSection />
        <PortfolioSection />
        <ApplyFormSection />
        <AssemblyVisuals />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
