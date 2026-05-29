import { footerSocialLinks, storyDetailConnectUrl } from "@/lib/footer-social-links";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  opensContactPopup?: boolean;
};

export const footerExploreLinks: FooterLink[] = [
  { label: "Trải nghiệm", href: "#experiences" },
  { label: "Câu chuyện", href: "#stories" },
  { label: "Cộng đồng", href: footerSocialLinks.facebook, external: true },
  { label: "Lịch sự kiện", href: "#experiences" },
];

export const footerDanamanLinks: FooterLink[] = [
  { label: "Về Danaman", href: "#ve-danaman" },
  { label: "Hợp tác", href: "#lien-he" },
  { label: "Liên hệ", href: "#lien-he", opensContactPopup: true },
  { label: "Câu hỏi thường gặp", href: "#lien-he" },
];

export const footerPhuOngLinks: FooterLink[] = [
  { label: "Đặc sản", href: storyDetailConnectUrl, external: true },
  { label: "Cá cơm cháy tỏi ớt", href: storyDetailConnectUrl, external: true },
  { label: "Hương vị biển", href: storyDetailConnectUrl, external: true },
  { label: "Đà Nẵng", href: storyDetailConnectUrl, external: true },
];
