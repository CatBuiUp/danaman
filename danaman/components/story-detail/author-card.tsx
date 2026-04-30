import Image from "next/image";

type AuthorCardProps = {
  author: string;
  avatar: string;
  date: string;
};

export function AuthorCard({ author, avatar, date }: AuthorCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        <Image src={avatar} alt={author} fill className="object-cover" sizes="48px" />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-900">{author}</p>
        <p className="text-xs text-zinc-500">{date}</p>
      </div>
    </div>
  );
}
