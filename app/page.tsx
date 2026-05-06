import { HeroSection } from "@/components/hero-section";
import { ServicesGrid } from "@/components/services-grid";
import { ServiceBanners } from "@/components/service-banners";
import { FeaturesSection } from "@/components/features-section";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <FeaturesSection />
      <ServiceBanners />
      <CTASection />
    </>
  );
}
