import Image from "next/image";

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
] as const;

type DongHanhMembersCardProps = {
  memberCountBadge?: string;
  memberCountLine?: string;
  avatarUrls?: readonly string[];
};

export function DongHanhMembersCard({
  memberCountBadge = "+2.500",
  memberCountLine = "+2.500 viên thành viên",
  avatarUrls = DEFAULT_AVATARS,
}: DongHanhMembersCardProps) {
  const ring = "border-2 border-white";

  return (
    <article
      className="flex min-h-[220px] flex-col items-center justify-center rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
      aria-label={memberCountLine}
    >
      <div className="flex items-center">
        {avatarUrls.slice(0, 4).map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full ${ring} ${index > 0 ? "-ml-2.5" : ""}`}
            style={{ zIndex: 4 - index }}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="40px" />
          </div>
        ))}
        <div
          className={`relative z-[5] -ml-2.5 flex h-10 min-w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-[#C5D4B8] px-1.5 ${ring}`}
        >
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold leading-none text-[#1F2717]">
            {memberCountBadge}
          </span>
        </div>
      </div>

      <p className="mt-4 text-center font-[family-name:var(--font-inter)] text-sm font-semibold leading-tight text-[#1F2717]">
        {memberCountLine}
      </p>
    </article>
  );
}
