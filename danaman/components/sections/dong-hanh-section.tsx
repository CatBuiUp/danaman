"use client";

import { DongHanhActionCard, DongHanhMembersCard, dongHanhActionIcons } from "@/components/cards";
import { useContactPopup } from "@/components/layout/contact-popup-provider";
import { ContentSection, SectionHeading } from "@/components/ui";
import { joinDanamanHref } from "@/lib/site-nav";

export function DongHanhSection() {
  const { openContactPopup } = useContactPopup();

  return (
    <ContentSection id="dong-hanh" className="pt-5 pb-6">
      <SectionHeading title="Đồng hành cùng Danaman" className="!mb-4 sm:!mb-5" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DongHanhActionCard
          icon={dongHanhActionIcons.handshake}
          iconClassName="bg-[#E3EDDC]"
          title="Trở thành đối tác"
          description="Cùng Danaman xây dựng những trải nghiệm chân thật và bền vững."
          ctaLabel="Tìm hiểu thêm →"
          ctaHref={joinDanamanHref}
          ctaExternal
        />

        <DongHanhActionCard
          icon={dongHanhActionIcons.lightbulb}
          iconClassName="bg-[#F5E8C8]"
          title="Đề xuất trải nghiệm"
          description="Có một câu chuyện, nghề truyền thống hoặc con người đặc biệt muốn giới thiệu?"
          ctaLabel="Đề xuất ngay →"
          onCtaClick={openContactPopup}
        />

        <DongHanhActionCard
          icon={dongHanhActionIcons.chat}
          iconClassName="bg-[#F5DEDE]"
          title="Kể cho chúng tôi một câu chuyện"
          description="Chia sẻ những giá trị địa phương đáng được nhiều người biết đến."
          ctaLabel="Gửi câu chuyện →"
          onCtaClick={openContactPopup}
        />

        <DongHanhMembersCard />
      </div>
    </ContentSection>
  );
}
