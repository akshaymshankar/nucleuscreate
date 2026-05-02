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
