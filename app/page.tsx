import { HeroSection } from "@/components/hero-section";
import { EditorPicksSection } from "@/components/editor-picks-section";
import { AdPopup } from "@/components/ad-popup";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EditorPicksSection />
      <AdPopup screen="home" delayMs={6000} />
    </>
  );
}
