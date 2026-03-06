import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import Differentials from "@/components/Differentials";
import StatsSection from "@/components/StatsSection";
import RoadmapSection from "@/components/RoadmapSection";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <FeaturesGrid />
      <Differentials />
      <StatsSection />
      <RoadmapSection />
      <CTAFinal />
      <Footer />
    </div>
  );
};

export default Index;