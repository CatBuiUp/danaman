import Image from "next/image";

import type { Opportunity } from "@/types";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-950">
      <div className="relative h-44 w-full">
        <Image
          src={opportunity.image}
          alt={opportunity.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
          {opportunity.type}
        </p>
        <h3 className="mt-2 text-lg font-semibold">{opportunity.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
          {opportunity.description}
        </p>
        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          Deadline: {opportunity.deadline}
        </p>
      </div>
    </article>
  );
}
