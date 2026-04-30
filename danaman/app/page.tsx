import {
  ExperiencesSection,
  FeaturedStoriesClientSection,
  HeroSection,
  OpportunitiesSection,
} from "@/components/sections";
import { getExperiences, getOpportunities } from "@/lib/api/client";

export default async function HomePage() {
  const [{ data: experiences }, { data: opportunities }] = await Promise.all([
    getExperiences(),
    getOpportunities(),
  ]);

  return (
    <div className="space-y-10 pb-2">
      <HeroSection />
      <div className="space-y-10 px-6 sm:px-10 lg:px-16">
        <FeaturedStoriesClientSection />
        <ExperiencesSection experiences={experiences} />
        <OpportunitiesSection opportunities={opportunities} />
      </div>
    </div>
  );
}
