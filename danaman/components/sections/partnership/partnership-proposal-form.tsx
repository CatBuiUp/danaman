"use client";

import { useState, type FormEvent } from "react";

const MAX_NAME_LENGTH = 50;
const MAX_LOCATION_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 300;

function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function formatPhoneDisplay(value: string) {
  const digits = getPhoneDigits(value);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}

export function PartnershipProposalForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const phoneDigits = getPhoneDigits(phone);
    const formattedPhone = formatPhoneDisplay(phoneDigits);
    const trimmedLocation = location.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || phoneDigits.length !== 10 || !trimmedLocation || !trimmedMessage) {
      setFeedback({
        type: "error",
        text: "Vui lòng điền đầy đủ họ tên, số điện thoại (10 chữ số), địa điểm và nội dung giới thiệu.",
      });
      return;
    }

    if (
      trimmedName.length > MAX_NAME_LENGTH ||
      trimmedLocation.length > MAX_LOCATION_LENGTH ||
      trimmedMessage.length > MAX_MESSAGE_LENGTH
    ) {
      setFeedback({
        type: "error",
        text: `Họ tên tối đa ${MAX_NAME_LENGTH} ký tự, địa điểm tối đa ${MAX_LOCATION_LENGTH} ký tự, nội dung tối đa ${MAX_MESSAGE_LENGTH} ký tự.`,
      });
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFeedback({
        type: "error",
        text: "Form chưa được cấu hình. Vui lòng liên hệ quản trị viên.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Danaman] Đề xuất ý tưởng từ ${trimmedName}`,
          from_name: "Danaman",
          name: trimmedName,
          phone: formattedPhone,
          location: trimmedLocation,
          message: trimmedMessage,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setFeedback({
          type: "error",
          text: result.message ?? "Không gửi được thông tin. Vui lòng thử lại sau.",
        });
        return;
      }

      setFeedback({ type: "success", text: "Đã gửi đề xuất. Danaman sẽ liên hệ bạn sớm." });
      setName("");
      setPhone("");
      setLocation("");
      setMessage("");
    } catch {
      setFeedback({ type: "error", text: "Không gửi được thông tin. Vui lòng thử lại sau." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-[#1F2717] outline-none transition placeholder:text-[#9CA39A] focus:border-[#D0AE7D]";

  return (
    <div className="rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1F2717] sm:text-2xl">
        Giới thiệu câu chuyện của bạn
      </h2>
      <p className="mt-2 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#5F6557]">
        Hãy chia sẻ với chúng tôi, Danaman sẽ liên hệ và cùng bạn trao đổi chi tiết hơn.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="font-[family-name:var(--font-inter)] text-sm font-medium text-[#1F2717]">
              Họ và tên <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên"
              maxLength={MAX_NAME_LENGTH}
              className={inputClassName}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="font-[family-name:var(--font-inter)] text-sm font-medium text-[#1F2717]">
              Số điện thoại <span className="text-red-500">*</span>
            </span>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(formatPhoneDisplay(e.target.value))}
              placeholder="Nhập số điện thoại"
              className={inputClassName}
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="font-[family-name:var(--font-inter)] text-sm font-medium text-[#1F2717]">
            Địa điểm / Khu vực <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ví dụ: Tân Thái, Sơn Trà, Hội An..."
            maxLength={MAX_LOCATION_LENGTH}
            className={inputClassName}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="font-[family-name:var(--font-inter)] text-sm font-medium text-[#1F2717]">
            Bạn muốn giới thiệu điều gì? <span className="text-red-500">*</span>
          </span>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mô tả ngắn về câu chuyện, nghề truyền thống, trải nghiệm hoặc dịch vụ..."
            maxLength={MAX_MESSAGE_LENGTH}
            rows={4}
            className={`${inputClassName} resize-y min-h-[120px]`}
          />
        </label>

        {feedback ? (
          <p
            role="status"
            aria-live="polite"
            className={`font-[family-name:var(--font-inter)] text-sm ${
              feedback.type === "success" ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {feedback.text}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1F2717] px-5 py-3.5 font-[family-name:var(--font-inter)] text-base font-semibold text-white transition hover:bg-[#2a3622] disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi cho Danaman"}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12h14M13 7l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
