import Image from "next/image";

import { footerSocialLinks } from "@/lib/footer-social-links";

const socialIconClass = "h-[18px] w-[18px]";

function IconFacebook() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function IconZalo() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12.017 0C5.396 0 .333 5.367.333 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.938 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.875-5.012-4.875-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.288l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.387 11.985-12.014C23.99 5.367 18.627 0 12.017 0"
      />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12.525.02c1.31-.02 2.61-.01 3.918-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.01-1-.01-1.49.14-1.48.69-2.94 1.63-4.12 1.45-1.84 3.64-3.02 5.98-3.22.02-2.42 0-4.84.01-7.26z"
      />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M23.498 6.186A3.016 3.016 0 0 0 21.376 4.05C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

const footerSocialItems = [
  { key: "facebook", label: "Facebook", href: footerSocialLinks.facebook, Icon: IconFacebook },
  { key: "zalo", label: "Zalo", href: footerSocialLinks.zalo, Icon: IconZalo },
  { key: "tiktok", label: "TikTok", href: footerSocialLinks.tiktok, Icon: IconTikTok },
  { key: "youtube", label: "YouTube", href: footerSocialLinks.youtube, Icon: IconYouTube },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-[10px] border-t border-black/10 bg-white px-1 py-0 text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 sm:px-10 lg:px-16">
      <div className="w-full space-y-4">
        <div className="grid gap-4 rounded-2xl bg-[#0D2B45] p-4 text-white md:grid-cols-2 md:p-5">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/25">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Danaman member"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                Cùng nhau phát triển
              </p>
              <h3 className="text-lg font-bold">Tham gia cộng đồng Danaman</h3>
              <p className="mt-1 text-xs text-zinc-200">
                Kết nối với những người cùng chí hướng và chia sẻ giá trị vào thực tế.
              </p>
              <button
                type="button"
                className="mt-2 rounded-md bg-amber-400 px-3 py-1.5 text-xs font-semibold text-[#0D2B45] hover:bg-amber-300"
              >
                Tham gia ngay
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-[#123554] p-3">
            <h4 className="text-sm font-semibold">Nhận câu chuyện và cơ hội mới mỗi tuần</h4>
            <p className="mt-1 text-xs text-zinc-200">
              Đăng ký để không bỏ lỡ những thông tin hữu ích về cộng đồng, trải nghiệm và cơ hội tại
              Da Nang.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-zinc-300 focus:border-amber-300 focus:outline-none"
              />
              <button
                type="button"
                className="rounded-md bg-amber-400 px-3 py-2 text-xs font-semibold text-[#0D2B45] hover:bg-amber-300"
              >
                Dang ky
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 text-xs sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-2xl font-extrabold text-[#0D2B45] dark:text-white">DANAMAN</p>
            <p className="mt-2 max-w-[220px] text-zinc-600 dark:text-zinc-300">
              Nối kết những câu chuyện thật và cơ hội kết nối tại thành phố Đà Nẵng.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {footerSocialItems.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 transition hover:bg-zinc-300 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Danh muc</p>
            <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>Câu chuyện</li>
              <li>Trải nghiệm</li>
              <li>Kết nối</li>
              <li>Cơ hội</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Ve Danaman</p>
            <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>Giới thiệu</li>
              <li>Hành trình</li>
              <li>Giá trị</li>
              <li>Điều khoản</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Liên hệ</p>
            <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>hello@danaman.vn</li>
              <li>Đà Nẵng, Việt Nam</li>
            </ul>
          </div>
        </div>

        <p className="border-t border-black/10 pt-4 text-center text-[11px] text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          @ 2024 Danaman.vn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
