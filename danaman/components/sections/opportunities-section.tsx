import { OpportunityCard } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import type { Opportunity } from "@/types";

type OpportunitiesSectionProps = {
  opportunities: Opportunity[];
};

export function OpportunitiesSection({ opportunities }: OpportunitiesSectionProps) {
  return (
    <section id="opportunities" className="space-y-6">
      <SectionHeading
        eyebrow=""
        title="Cơ hội và kết nối"
        description="Áp dụng cho học bổng, thực tập sinh và hỗ trợ tài chính được thiết kế để khuếch đại tác động của cộng đồng."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  );
}
