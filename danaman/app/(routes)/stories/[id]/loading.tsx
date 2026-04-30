export default function StoryDetailLoading() {
  return (
    <div className="space-y-8 px-6 py-8 sm:px-10 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-10">
        <div className="h-[420px] animate-pulse rounded-2xl bg-zinc-200 lg:col-span-7" />
        <div className="space-y-4 lg:col-span-3">
          <div className="h-6 w-24 animate-pulse rounded bg-zinc-200" />
          <div className="h-10 w-full animate-pulse rounded bg-zinc-200" />
          <div className="h-16 w-full animate-pulse rounded bg-zinc-200" />
          <div className="h-24 w-full animate-pulse rounded bg-zinc-200" />
        </div>
      </div>
      <div className="h-64 animate-pulse rounded-2xl bg-zinc-200" />
    </div>
  );
}
