import Image from "next/image";
import Link from "next/link";
import logo from "@/app/icon.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 px-6 py-1 backdrop-blur dark:border-white/10 dark:bg-zinc-950/80">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="inline-flex items-center p-[5px]">
          <Image
            src={logo}
            alt="Danaman logo"
            width={198}
            height={48}
            priority
            className="h-[48px] w-auto"
          />
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="#stories">Câu chuyện</Link>
          <Link href="#experiences">Trải nghiệm</Link>
          <Link href="#opportunities">Cơ hội</Link>
        </nav>
      </div>
    </header>
  );
}
