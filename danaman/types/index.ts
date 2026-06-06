export type ApiResponse<T> = {
  data: T;
  message: string;
};

/** Layout trang chi tiết — xem `lib/story-ui-type.ts` */
export type StoryUiType = "default" | "experience-landing";

export type Story = {
  id: string;
  image: string;
  gallery?: string[];
  title: string;
  description: string;
  content?: string[];
  quote?: string;
  author: string;
  authorAvatar?: string;
  publishedAt?: string;
  location: string;
  tags?: string[];
  connectionGroup?: string;
  readTime: string;
  category: string;
  uiType?: StoryUiType;
};

export type Experience = {
  id: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  mode: "Online" | "Offline" | "Hybrid";
};

export type Opportunity = {
  id: string;
  image: string;
  title: string;
  description: string;
  type: "Volunteer" | "Fellowship" | "Funding";
  deadline: string;
};
