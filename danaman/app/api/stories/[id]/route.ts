import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import type { Story } from "@/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const STORY_DETAILS_MOCK: Story[] = [
  {
    id: "mock-story-1",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Nguoi tre bien bai giu gin bo bien Da Nang",
    description: "Nhom tinh nguyen vien to chuc don rac va lan toa nhan thuc bao ve moi truong bien.",
    content: [
      "Moi cuoi tuan, mot nhom ban tre tai Da Nang lai cung nhau thu gom rac va phan loai tai bai bien. Hanh dong nho nhung deu dan da tao thanh thay doi ro rang trong nhan thuc cua nguoi dan dia phuong.",
      "Khong chi don rac, ho con to chuc workshop nho cho hoc sinh va du khach de chia se cach bao ve he sinh thai bien. Cac hoat dong nay giup ket noi nhieu nhom cong dong khac nhau cung chung muc tieu.",
      "Trong 6 thang, nhom da mo rong du an den ba bai bien lon va xay dung mang luoi tinh nguyen vien thuong xuyen.",
    ],
    quote: "Khi moi nguoi cung hanh dong mot chut, bo bien se thay doi rat nhanh.",
    author: "Minh Anh",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    publishedAt: "20/05/2024",
    location: "Da Nang",
    tags: ["Moi truong", "Cong dong", "Tinh nguyen"],
    connectionGroup: "Nhom Ban Tre Vi Bien Xanh",
    readTime: "5 min read",
    category: "Cong dong",
  },
  {
    id: "mock-story-2",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Hanh trinh mo lop hoc cho tre em vung ven",
    description: "Tu mot y tuong nho, lop hoc cuoi tuan da tro thanh diem den cua nhieu em nho.",
    content: [
      "Lop hoc duoc mo trong nha van hoa phuong, bat dau voi 12 hoc sinh va 3 tinh nguyen vien. Sau 3 thang, so luong hoc sinh da tang gap doi nhung van giu mo hinh hoc tap than thien.",
      "Cac buoi hoc ket hop ky nang song, ky nang doc hieu va hoat dong ke chuyen sang tao. Tre em duoc khuyen khich chia se cau chuyen cua chinh minh.",
      "Du an hien dang ket noi them giao vien va doanh nghiep dia phuong de duy tri lau dai.",
    ],
    quote: "Moi dua tre deu xung dang co mot khong gian hoc tap day cam hung.",
    author: "Gia Han",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    publishedAt: "16/05/2024",
    location: "Lien Chieu",
    tags: ["Giao duc", "Tre em", "Ky nang song"],
    connectionGroup: "Lop hoc Cuoi Tuan",
    readTime: "4 min read",
    category: "Giao duc",
  },
  {
    id: "mock-story-3",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Quan ca phe sach ket noi nguoi tre va nghe nhan",
    description: "Khong gian nho giup gioi thieu nghe thu cong truyen thong den nguoi tre thanh pho.",
    content: [
      "Quan ca phe sach nay la diem hen cho nhung nguoi yeu van hoa dia phuong va thu cong truyen thong.",
      "Moi thang, quan phoi hop voi nghe nhan de to chuc buoi chia se nho, giup nguoi tre tiep can ky nang va cau chuyen nghe.",
    ],
    quote: "Van hoa duoc giu lai bang su ket noi lien tuc giua the he cu va moi.",
    author: "Bao Tran",
    authorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    publishedAt: "10/05/2024",
    location: "Hai Chau",
    tags: ["Van hoa", "Nghe thuat", "Cong dong"],
    connectionGroup: "Danaman Culture Hub",
    readTime: "6 min read",
    category: "Van hoa",
  },
  {
    id: "mock-story-4",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Nhom startup xa hoi dua nong san len nen tang so",
    description: "Cau chuyen ve cach cac ban tre ho tro nguoi dan ban hang qua kenh truc tuyen.",
    content: [
      "Nhom startup tao website va quy trinh dong goi don gian de nguoi dan co the tu ban hang qua mang.",
      "Sau 4 thang thu nghiem, doanh thu trung binh cua cac ho dan tang on dinh va pham vi khach hang mo rong.",
    ],
    quote: "Cong nghe se co y nghia hon khi no giai quyet van de that cua cong dong.",
    author: "Thanh Khoa",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    publishedAt: "08/05/2024",
    location: "Son Tra",
    tags: ["Khoi nghiep", "Cong nghe", "Nong san"],
    connectionGroup: "Danaman Startup Circle",
    readTime: "7 min read",
    category: "Khoi nghiep",
  },
  {
    id: "mock-story-5",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Dem nhac duong pho gay quy cho thu vien cong dong",
    description: "Su kien quy tu nhieu nghe si tre, thu hut hang tram ban tre tham gia.",
    content: [
      "Dem nhac duoc to chuc tai khong gian cong cong, ket hop trinh dien va ke chuyen ve hanh trinh lap thu vien.",
      "Toan bo kinh phi gay quy duoc dung de mua sach, thiet bi hoc tap va cai tao khong gian doc cho tre nho.",
    ],
    quote: "Am nhac la cach nhanh nhat de ket noi nhieu nguoi vi mot muc tieu chung.",
    author: "Ngoc Bich",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    publishedAt: "06/05/2024",
    location: "Ngu Hanh Son",
    tags: ["Su kien", "Am nhac", "Thu vien"],
    connectionGroup: "Danaman Event Team",
    readTime: "3 min read",
    category: "Su kien",
  },
  {
    id: "mock-story-6",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Tiem banh nho trao co hoi viec lam cho nguoi khuyet tat",
    description: "Mo hinh kinh doanh ben vung giup nhieu lao dong yeu the co thu nhap on dinh.",
    content: [
      "Tiem banh ket hop dao tao ky nang co ban va ho tro moi truong lam viec linh hoat cho nhan su dac thu.",
      "Doanh thu tang deu theo thang, cho phep mo rong quy mo va tuyen them nhieu vi tri moi.",
    ],
    quote: "Khi doanh nghiep dat con nguoi vao trung tam, tac dong xa hoi se den mot cach tu nhien.",
    author: "Quoc Huy",
    authorAvatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
    publishedAt: "03/05/2024",
    location: "Cam Le",
    tags: ["Tac dong xa hoi", "Viec lam", "Bao gom"],
    connectionGroup: "Danaman Social Biz",
    readTime: "5 min read",
    category: "Tac dong xa hoi",
  },
  {
    id: "mock-story-7",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Kham pha lang nghe truyen thong cung huong dan vien ban dia",
    description: "Chuoi workshop giup du khach hieu hon ve lich su va ban sac dia phuong.",
    content: [
      "Chuoi tour nho dua du khach den cac lang nghe, noi nghe nhan truc tiep chia se quy trinh san xuat.",
      "Hoat dong tao thu nhap bo sung cho nguoi dan va giup bao ton tri thuc truyen thong tai dia phuong.",
    ],
    quote: "Moi hanh trinh deu co the tro thanh cau noi giua du khach va ban sac dia phuong.",
    author: "Tuan Vu",
    authorAvatar:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=200&q=80",
    publishedAt: "01/05/2024",
    location: "Hoa Vang",
    tags: ["Du lich", "Lang nghe", "Trai nghiem"],
    connectionGroup: "Danaman Local Guide",
    readTime: "4 min read",
    category: "Du lich",
  },
  {
    id: "mock-story-8",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    ],
    title: "Co giao ve huu mo lop day mien phi cho cong nhan",
    description: "Moi toi, lop hoc nho sang den, giup cong nhan bo sung ky nang va tu tin hon.",
    content: [
      "Lop hoc toi tap trung vao ky nang giao tiep, tin hoc co ban va ho tro hoan thien ho so viec lam.",
      "Sau nhieu thang, nhieu hoc vien da tim duoc cong viec on dinh hon va cai thien thu nhap.",
    ],
    quote: "Hoc tap khong co gioi han tuoi tac, chi can co mot co hoi dung luc.",
    author: "Lan Chi",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    publishedAt: "28/04/2024",
    location: "Thanh Khe",
    tags: ["Cam hung", "Giao duc", "Cong nhan"],
    connectionGroup: "Danaman Learning Circle",
    readTime: "6 min read",
    category: "Cam hung",
  },
];

function getMockStoryById(id: string) {
  return STORY_DETAILS_MOCK.find((story) => story.id === id);
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const story = await prisma.story.findUnique({
      where: { id },
    });

    if (story) {
      return NextResponse.json({
        success: true,
        message: "Story fetched successfully",
        data: {
          ...story,
          gallery: [story.image],
          content: [story.description],
          authorAvatar: story.image,
          publishedAt: new Date(story.createdAt).toLocaleDateString("vi-VN"),
          tags: [story.category],
          connectionGroup: "Danaman Community",
        },
      });
    }
  } catch {
    // Ignore Prisma runtime errors in local/dev and fallback to mock.
  }

  const mockStory = getMockStoryById(id);
  if (mockStory) {
    return NextResponse.json({
      success: true,
      message: "Mock story fetched successfully",
      data: mockStory,
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Story not found",
    },
    { status: 404 },
  );
}
