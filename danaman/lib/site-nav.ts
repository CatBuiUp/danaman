import { footerSocialLinks } from "@/lib/footer-social-links";

export const siteNavLinks = [
  { label: "Trải nghiệm", href: "#experiences" },
  { label: "Chuyện bản địa", href: "#stories" },
  { label: "Về Danaman", href: "#ve-danaman" },
  { label: "Cộng đồng", href: footerSocialLinks.facebook },
  { label: "Liên hệ", href: "#lien-he" },
] as const;

export const joinDanamanHref = footerSocialLinks.facebook;
