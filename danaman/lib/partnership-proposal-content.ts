import { DONG_HANH_CUNG_DANAMAN_IMAGE } from "@/lib/landing-images";

export const PARTNERSHIP_PROPOSAL_HERO_IMAGE = DONG_HANH_CUNG_DANAMAN_IMAGE;

export const partnershipHeroItems = [
  {
    title: "Trải nghiệm chân thật",
    description: "Cùng nhau tạo nên những trải nghiệm ý nghĩa",
    icon: "handshake",
  },
  {
    title: "Lan tỏa giá trị",
    description: "Đưa câu chuyện địa phương đến với nhiều người hơn",
    icon: "lightbulb",
  },
  {
    title: "Phát triển bền vững",
    description: "Cùng gìn giữ và phát triển giá trị địa phương",
    icon: "leaf",
  },
] as const;

export const partnershipLookingForItems = [
  { title: "Nghệ nhân", description: "Người giữ nghề truyền thống" },
  { title: "Người dân địa phương", description: "Người sống, làm việc tại địa phương" },
  { title: "Chủ homestay", description: "Homestay owners" },
  { title: "Hướng dẫn viên", description: "Guide bản địa" },
  { title: "Quán ăn gia đình", description: "Ẩm thực địa phương" },
  { title: "Làng nghề", description: "Nghề thủ công, sản xuất truyền thống" },
  { title: "Người sáng tạo nội dung", description: "Content creator" },
  { title: "Đối tác địa phương khác", description: "And other local partners" },
] as const;

export const partnershipBenefits = [
  {
    title: "Hỗ trợ xây dựng trải nghiệm",
    description: "Danaman đồng hành cùng bạn thiết kế trải nghiệm phù hợp với câu chuyện địa phương.",
  },
  {
    title: "Hỗ trợ truyền thông",
    description: "Giới thiệu câu chuyện và trải nghiệm của bạn đến cộng đồng yêu du lịch.",
  },
  {
    title: "Tiếp cận du khách",
    description: "Kết nối với những du khách quan tâm đến trải nghiệm chân thật tại Đà Nẵng.",
  },
  {
    title: "Chia sẻ doanh thu minh bạch",
    description: "Cơ chế hợp tác rõ ràng, tôn trọng giá trị người bản địa mang lại.",
  },
  {
    title: "Gìn giữ và lan tỏa giá trị địa phương",
    description: "Cùng nhau bảo tồn nghề, văn hóa và câu chuyện của vùng đất.",
  },
] as const;

export const partnershipQuickContacts = [
  {
    id: "zalo",
    label: "Chat Zalo",
    value: "0914.897.766",
    href: "https://zalo.me/0356325576",
    iconBg: "bg-[#00A6FF]",
  },
  {
    id: "messenger",
    label: "Chat Messenger",
    value: "Danaman",
    href: "https://m.me/danaman.local/",
    iconBg: "bg-[#0084FF]",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+84914897766",
    href: "https://wa.me/84356325576",
    iconBg: "bg-[#25D366]",
  },
] as const;
