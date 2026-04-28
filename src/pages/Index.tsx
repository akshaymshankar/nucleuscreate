import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import AssemblyVisuals from "@/components/AssemblyVisuals";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ApplyFormSection from "@/components/ApplyFormSection";
import Footer from "@/components/Footer";
import useSmoothScroll from "@/hooks/use-smooth-scroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="bg-background min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <AssemblyVisuals />
      <ProcessSection />
      <ServicesSection />
      <PortfolioSection />
      <ApplyFormSection />
      <Footer />
    </div>
  );
};

export default Index;
