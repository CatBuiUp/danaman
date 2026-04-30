type StoryContentProps = {
  paragraphs: string[];
  quote?: string;
};

export function StoryContent({ paragraphs, quote }: StoryContentProps) {
  return (
    <article className="prose prose-zinc max-w-none rounded-2xl bg-white p-6 shadow-sm">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      {quote ? (
        <blockquote className="border-l-4 border-sky-500 pl-4 italic text-zinc-700">{quote}</blockquote>
      ) : null}
    </article>
  );
}
