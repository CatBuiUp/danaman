type StoryContentProps = {
  paragraphs: string[];
  quote?: string;
};

export function StoryContent({ paragraphs, quote }: StoryContentProps) {
  return (
    <article className="min-w-0 max-w-full space-y-5 rounded-2xl bg-white p-3 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">Trải nghiệm có gì đặc biệt?</h2>

      <div className="space-y-4">
        <div>
          <p className="text-base font-semibold text-zinc-900">1. Dùng bữa tại nhà ngư dân địa phương</p>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            Thưởng thức món ăn gia đình với nguyên liệu tươi, đậm hương vị làng chài.
          </p>
        </div>
        <div>
          <p className="text-base font-semibold text-zinc-900">2. Nghe chuyện đời biển</p>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            Lắng nghe câu chuyện thật về cuộc sống, nghề biển và con người Đà Nẵng.
          </p>
        </div>
        <div>
          <p className="text-base font-semibold text-zinc-900">3. Giao lưu, kết nối</p>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            Trò chuyện, tìm hiểu văn hóa địa phương và tạo thêm những kết nối mới.
          </p>
        </div>
      </div>

      {paragraphs.length > 0 ? (
        <p className="border-t border-zinc-100 pt-4 text-sm leading-6 text-zinc-600">{paragraphs[0]}</p>
      ) : null}
      {quote ? <blockquote className="border-l-4 border-sky-500 pl-4 italic text-zinc-700">{quote}</blockquote> : null}
    </article>
  );
}
