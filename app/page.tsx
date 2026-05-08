import { HeroSection } from "@/components/hero-section";
import { AdPopup } from "@/components/ad-popup";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AdPopup screen="home" delayMs={6000} />
    </>
  );
}
