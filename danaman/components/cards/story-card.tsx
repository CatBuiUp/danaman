import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/types";

type StoryCardProps = {
  story: Story;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.id}`}
      className="group relative block h-[420px] overflow-hidden rounded-2xl border border-black/10 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10"
    >
      <div className="absolute inset-0">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071a2f]/95 via-[#071a2f]/55 to-[#071a2f]/10" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-4 pt-[40%] text-white">
        <p className="inline-flex w-fit rounded-full bg-amber-300 px-2.5 py-1 text-[11px] font-semibold text-black">
          {story.category}
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight">{story.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-base text-zinc-100/95">
          {story.description}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-zinc-100">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/40">
              <Image src={story.image} alt={story.author} fill className="object-cover" sizes="24px" />
            </div>
            <span className="font-medium leading-none">{story.author}</span>
          </div>
          <span>{story.readTime}</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-200">{story.location}</p>
      </div>
    </Link>
  );
}
