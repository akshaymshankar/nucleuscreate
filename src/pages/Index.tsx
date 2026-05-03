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

      {/* Mobile Sticky CTA - Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-[60]">
        <a
          href="#apply"
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-heading text-xs font-bold uppercase tracking-wider shadow-[0_4px_30px_rgba(34,197,94,0.5)] transition-transform active:scale-95"
        >
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30"></span>
          Apply
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
