type InfoCardProps = {
  badge: string;
  title: string;
  description: string;
  meta: string;
};

export function InfoCard({ badge, title, description, meta }: InfoCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">
        {badge}
      </p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">{meta}</p>
    </article>
  );
}
