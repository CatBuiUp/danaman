import type { Metadata } from "next";

import { PartnershipProposalPage } from "@/components/sections/partnership/partnership-proposal-page";

export const metadata: Metadata = {
  title: "Đồng hành cùng Danaman | Đề xuất ý tưởng",
  description:
    "Đề xuất trải nghiệm, câu chuyện và giá trị địa phương để cùng Danaman xây dựng trải nghiệm chân thật tại Đà Nẵng.",
};

export default function DeXuatYTuongPage() {
  return <PartnershipProposalPage />;
}
