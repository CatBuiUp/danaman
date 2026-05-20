import Image from "next/image";
import Link from "next/link";

import type { Story } from "@/types";

type DanangStoryCardProps = {
  story: Story;
};

export function DanangStoryCard({ story }: DanangStoryCardProps) {
  return (
    <Link
      href={`/stories/${story.id}`}
      className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 300px"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-[#1F2717]/75 px-3 py-1 text-xs font-medium text-[#EEDBC0] backdrop-blur-sm">
          {story.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium leading-[1.2] tracking-[-0.5px] text-[#1F2717] transition group-hover:text-[#25301C] sm:text-[1.35rem]">
          {story.title}
        </h3>
      </div>
    </Link>
  );
}
