import { ExperienceCard } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import type { Experience } from "@/types";

type ExperiencesSectionProps = {
  experiences: Experience[];
};

export function ExperiencesSection({ experiences }: ExperiencesSectionProps) {
  return (
    <section id="experiences" className="space-y-6">
      <SectionHeading
        eyebrow=""
        title="Trải nghiệm Đà Nẵng"
        description="Từ các sự kiện trực tuyến đến các sự kiện trực tiếp, các trải nghiệm này giúp bạn học và hợp tác."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
}
