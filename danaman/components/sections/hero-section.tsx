import { Button } from "@/components/ui/button";
export function HeroSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <div
        className="relative flex min-h-[540px] items-end"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative z-10 mx-auto w-full px-6 pb-10 sm:px-10 lg:px-16">
          <div className="max-w-3xl space-y-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
              Danaman Community Platform
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Kết nối con người, câu chuyện và cơ hội tại Đà Nẵng
            </h1>
            <p className="text-sm text-zinc-100 sm:text-base">
              Trải nghiệm - Kết nối - Chia sẻ - Phát triển
            </p>

            <div className="flex flex-wrap gap-3">
              <Button href="#stories">Xem câu chuyện</Button>
              <Button href="#opportunities">Tham gia cộng đồng</Button>
            </div>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-white sm:grid-cols-4">
            <div className="rounded-lg border border-white/30 bg-black/35 p-3 backdrop-blur-sm">
              <p className="text-2xl font-semibold">500+</p>
              <p className="text-xs text-zinc-200">Câu chuyện</p>
            </div>
            <div className="rounded-lg border border-white/30 bg-black/35 p-3 backdrop-blur-sm">
              <p className="text-2xl font-semibold">3.200+</p>
              <p className="text-xs text-zinc-200">Thành viên</p>
            </div>
            <div className="rounded-lg border border-white/30 bg-black/35 p-3 backdrop-blur-sm">
              <p className="text-2xl font-semibold">250+</p>
              <p className="text-xs text-zinc-200">Cơ hội kết nối</p>
            </div>
            <div className="rounded-lg border border-white/30 bg-black/35 p-3 backdrop-blur-sm">
              <p className="text-2xl font-semibold">120+</p>
              <p className="text-xs text-zinc-200">Sự kiện</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
