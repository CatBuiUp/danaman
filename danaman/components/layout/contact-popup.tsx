"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { footerSocialLinks } from "@/lib/footer-social-links";

type ContactPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MAX_NAME_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 300;

const contactBenefits = [
  {
    icon: "leaf",
    title: "Trò chuyện với người địa phương",
    description: "Để hiểu Đà Nẵng hơn",
  },
  {
    icon: "chat",
    title: "Tư vấn trải nghiệm phù hợp bạn",
    description: "Dựa trên sở thích, thời gian và mong muốn",
  },
  {
    icon: "heart",
    title: "Gợi ý những trải nghiệm độc đáo",
    description: "Những điều mà khách du lịch thường bỏ lỡ",
  },
  {
    icon: "users",
    title: "Đồng hành như một người bạn địa phương",
    description: "Không chỉ là tour, mà là những kết nối thật",
  },
] as const;

type BenefitIconName = (typeof contactBenefits)[number]["icon"];

function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function formatPhoneDisplay(value: string) {
  const digits = getPhoneDigits(value);

  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}

function BenefitIcon({ icon }: { icon: BenefitIconName }) {
  if (icon === "leaf") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#D0AE7D]" fill="none" aria-hidden>
        <path d="M6 20C14 20 19 15 19 7V4H16C8 4 3 9 3 17V20H6Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 16C10 14 12 12 15 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "chat") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#D0AE7D]" fill="none" aria-hidden>
        <path
          d="M12 4C6.5 4 2 7.6 2 12C2 14.2 3.1 16.2 5 17.6V21L8.3 19.2C9.4 19.6 10.7 19.9 12 19.9C17.5 19.9 22 16.4 22 12C22 7.6 17.5 4 12 4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "heart") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#D0AE7D]" fill="none" aria-hidden>
        <path
          d="M12 20C11.8 20 11.7 20 11.6 19.9C7.2 16.7 4 13.8 4 10.2C4 7.9 5.9 6 8.2 6C9.8 6 11.1 6.8 12 8.1C12.9 6.8 14.2 6 15.8 6C18.1 6 20 7.9 20 10.2C20 13.8 16.8 16.7 12.4 19.9C12.3 20 12.2 20 12 20Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#D0AE7D]" fill="none" aria-hidden>
      <path
        d="M9 12.5C10.9 12.5 12.5 10.9 12.5 9C12.5 7.1 10.9 5.5 9 5.5C7.1 5.5 5.5 7.1 5.5 9C5.5 10.9 7.1 12.5 9 12.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17 11C18.4 11 19.5 9.9 19.5 8.5C19.5 7.1 18.4 6 17 6C15.6 6 14.5 7.1 14.5 8.5C14.5 9.9 15.6 11 17 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 19.5C3.5 16.9 5.7 14.8 8.3 14.8H9.7C12.3 14.8 14.5 16.9 14.5 19.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14.5 18.8C14.8 17.2 16.2 16 17.9 16H18.3C20.3 16 22 17.7 22 19.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  useEffect(() => {
    if (!isOpen) {
      setFormFeedback(null);
      return;
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const phoneDigits = getPhoneDigits(phone);
    const formattedPhone = formatPhoneDisplay(phoneDigits);
    const trimmedMessage = message.trim();

    if (!trimmedName || phoneDigits.length !== 10 || !trimmedMessage) {
      setFormFeedback({
        type: "error",
        text: "Vui lòng điền đầy đủ họ tên, số điện thoại (10 chữ số) và nội dung.",
      });
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setFormFeedback({
        type: "error",
        text: `Họ tên tối đa ${MAX_NAME_LENGTH} ký tự, nội dung tối đa ${MAX_MESSAGE_LENGTH} ký tự.`,
      });
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setFormFeedback({
        type: "error",
        text: "Form liên hệ chưa được cấu hình. Vui lòng liên hệ quản trị viên.",
      });
      return;
    }

    setIsSubmitting(true);
    setFormFeedback(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Danaman] Liên hệ mới từ ${trimmedName}`,
          from_name: "Danaman",
          name: trimmedName,
          phone: formattedPhone,
          message: trimmedMessage,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setFormFeedback({
          type: "error",
          text: result.message ?? "Không gửi được thông tin. Vui lòng thử lại sau.",
        });
        return;
      }

      setFormFeedback({
        type: "success",
        text: "Đã gửi thông tin. Danaman sẽ phản hồi bạn sớm.",
      });
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setFormFeedback({
        type: "error",
        text: "Không gửi được thông tin. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-[#D0AE7D]/25 bg-[#1F2717] text-[#EEDBC0] shadow-[0_24px_80px_rgba(0,0,0,0.55)] max-h-[calc(100vh-2rem)] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl leading-none text-white transition hover:bg-black/70"
          aria-label="Đóng popup liên hệ"
        >
          ×
        </button>

        <div className="grid md:grid-cols-12">
          <div className="bg-[#1F2717] p-6 sm:p-8 md:col-span-5">
            <div className="relative mx-auto h-[110px] w-full max-w-[380px]">
              <Image
                src="/ket-noi-danaman.png"
                alt="Kết nối cùng Danaman"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-contain object-center"
                priority
              />
            </div>
            <p className="mx-auto mt-6 max-w-sm text-center font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#D7C9B2]">
              Nếu bạn muốn trải nghiệm Đà Nẵng theo một cách chân thật hơn, hãy trò chuyện cùng tụi mình.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href={footerSocialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-[#1f6fff] px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white transition hover:brightness-110"
              >
                Nhắn Facebook Messenger
              </Link>
              <Link
                href={footerSocialLinks.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-[#00a6ff] px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm font-semibold text-white transition hover:brightness-110"
              >
                Chat với Danaman qua Zalo
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#D0AE7D]/35" />
              <span className="font-[family-name:var(--font-montserrat)] text-[16px] font-semibold uppercase tracking-wide text-[#C79C41]">
                HOẶC
              </span>
              <span className="h-px flex-1 bg-[#D0AE7D]/35" />
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit} noValidate>
              <p className="flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-[1.5xl] font-semibold text-[#F7F0E2]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#D0AE7D]" fill="none" aria-hidden>
                  <rect x="3" y="6" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Để lại thông tin cho Danaman
              </p>

              <label className="flex items-center gap-3 rounded-xl border border-[#D0AE7D]/35 bg-[#25301C]/55 px-3 py-3">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#D0AE7D]" fill="none" aria-hidden>
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M5 19C5.7 15.9 8.5 14 12 14C15.5 14 18.3 15.9 19 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  name="name"
                  maxLength={MAX_NAME_LENGTH}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Họ và tên của bạn"
                  disabled={isSubmitting}
                  className="w-full bg-transparent font-[family-name:var(--font-inter)] text-[16px] text-[#D7C9B2] placeholder:text-[#8A907E] focus:outline-none disabled:opacity-60"
                />
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-[#D0AE7D]/35 bg-[#25301C]/55 px-3 py-3">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#D0AE7D]" fill="none" aria-hidden>
                  <path d="M6.4 4.5C6.8 4.2 7.4 4.2 7.8 4.5L10.5 6.9C10.9 7.3 11 7.9 10.7 8.4L9.5 10.2C10.5 12.3 11.8 13.6 13.8 14.5L15.6 13.3C16.1 13 16.7 13.1 17.1 13.5L19.5 16.2C19.8 16.6 19.8 17.2 19.5 17.6L18.3 19C17.8 19.6 17 19.9 16.2 19.8C8.7 18.8 5.2 15.3 4.2 7.8C4.1 7 4.4 6.2 5 5.7L6.4 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={12}
                  value={phone}
                  onChange={(event) => setPhone(formatPhoneDisplay(event.target.value))}
                  placeholder="0905 324 235"
                  disabled={isSubmitting}
                  className="w-full bg-transparent font-[family-name:var(--font-inter)] text-[16px] text-[#D7C9B2] placeholder:text-[#8A907E] focus:outline-none disabled:opacity-60"
                />
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-[#D0AE7D]/35 bg-[#25301C]/55 px-3 py-3">
                <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-[#D0AE7D]" fill="none" aria-hidden>
                  <rect x="3" y="4.5" width="18" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M7.5 9H16.5M7.5 13H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <textarea
                  name="message"
                  maxLength={MAX_MESSAGE_LENGTH}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Bạn muốn trải nghiệm gì? (vd: Bữa cơm làng chài, làm nước mắm...)"
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full resize-none bg-transparent font-[family-name:var(--font-inter)] text-[16px] leading-snug text-[#D7C9B2] placeholder:text-[#8A907E] focus:outline-none disabled:opacity-60"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-[#D0AE7D] px-4 py-3 font-[family-name:var(--font-montserrat)] text-[16px] font-bold uppercase tracking-wide text-[#1F2717] transition hover:bg-[#e0c090] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
              </button>

              {formFeedback ? (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-xl border px-4 py-3 text-center font-[family-name:var(--font-inter)] text-sm ${
                    formFeedback.type === "success"
                      ? "border-[#6B9B63]/50 bg-[#2A3D28] text-[#B8E0B0]"
                      : "border-[#9B6363]/50 bg-[#3D2828] text-[#F0B8B8]"
                  }`}
                >
                  {formFeedback.text}
                </div>
              ) : null}

              <p className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[16px] text-[#E6D7BE]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#D0AE7D]" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 7.5V12L15 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Danaman thường phản hồi trong vài phút.
              </p>
            </form>
          </div>

          <div className="bg-[#1F2717] md:col-span-7">
            <div className="relative h-56 w-full sm:h-64">
              <Image
                src="/cau-chuyen-da-nang.png"
                alt="Danaman kết nối cùng du khách"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1152px) 58vw, 672px"
                className="object-cover"
              />
            </div>

            <div className="space-y-2 p-6">
              {contactBenefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3 border-b border-[#D0AE7D]/15 pb-4 last:border-0">
                  <span className="mt-1 shrink-0">
                    <BenefitIcon icon={benefit.icon} />
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-cormorant)] text-1xl text-[#F7F0E2] sm:text-1xl">
                      {benefit.title}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-inter)] text-sm text-[#C6B89F]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="space-y-4 pt-2">
                <div className="relative h-24 w-full overflow-hidden rounded-lg sm:h-28">
                  <Image
                    src="/cau-chuyen-moi-nguoi.png"
                    alt="Mỗi con người là một câu chuyện"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1152px) 58vw, 672px"
                    className="object-cover"
                  />
                </div>
                <p className="mx-auto text-center font-[family-name:var(--font-allura)] text-1xl leading-tight text-[#D0AE7D] sm:text-2xl">
                  Mỗi con người là 1 câu chuyện,
                  <br />
                  mỗi nụ cười là một bản sắc. ♡
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
