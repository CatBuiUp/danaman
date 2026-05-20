import { HeroSection, HomeMainContent, PhuOngFoodsBanner } from "@/components/sections";
import { loadActiveStoryRecords } from "@/lib/stories-xml";

export default async function HomePage() {
  const fallbackStoryRecords = loadActiveStoryRecords();

  return (
    <div className="pb-2">
      <HeroSection />
      <HomeMainContent fallbackStoryRecords={fallbackStoryRecords} />
      <PhuOngFoodsBanner />
    </div>
  );
}
