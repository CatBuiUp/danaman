import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function SectionHeading({ title, viewAllHref, viewAllLabel }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="font-[family-name:var(--font-playfair)] text-[2rem] font-medium leading-[1.2] tracking-[-0.5px] text-[#1F2717] sm:text-[2.25rem]">
        {title}
      </h2>
      {viewAllHref && viewAllLabel ? (
        <Link
          href={viewAllHref}
          className="shrink-0 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-[#5F6557] transition hover:text-[#1F2717]"
        >
          {viewAllLabel}
        </Link>
      ) : null}
    </div>
  );
}
