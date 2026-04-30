"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function StoryDetailError({ error, reset }: ErrorProps) {
  return (
    <div className="px-6 py-10 sm:px-10 lg:px-16">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">Khong the tai chi tiet cau chuyen</h2>
        <p className="mt-2 text-sm text-red-600">{error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
        >
          Thu lai
        </button>
      </div>
    </div>
  );
}
