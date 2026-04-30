import Image from "next/image";

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
              Noi ket noi nhung cau chuyen that va co hoi ket noi tai thanh pho Da Nang.
            </p>
            <div className="mt-3 flex gap-2 text-[11px]">
              <span className="rounded-full bg-zinc-200 px-2 py-1 dark:bg-zinc-800">fb</span>
              <span className="rounded-full bg-zinc-200 px-2 py-1 dark:bg-zinc-800">yt</span>
              <span className="rounded-full bg-zinc-200 px-2 py-1 dark:bg-zinc-800">in</span>
              <span className="rounded-full bg-zinc-200 px-2 py-1 dark:bg-zinc-800">tt</span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Danh muc</p>
            <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>Cau chuyen</li>
              <li>Trai nghiem</li>
              <li>Ket noi</li>
              <li>Co hoi</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Ve Danaman</p>
            <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>Gioi thieu</li>
              <li>Hanh trinh</li>
              <li>Gia tri</li>
              <li>Dieu khoan</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Lien he</p>
            <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>hello@danaman.vn</li>
              <li>Da Nang, Viet Nam</li>
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
