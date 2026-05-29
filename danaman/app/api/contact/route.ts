import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/send-contact-email";

type ContactPayload = {
  name?: string;
  phone?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Vui lòng điền đầy đủ họ tên, số điện thoại và nội dung." },
        { status: 400 },
      );
    }

    await sendContactEmail({ name, phone, message });

    return NextResponse.json({
      success: true,
      message: "Đã gửi thông tin. Danaman sẽ phản hồi bạn sớm.",
    });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        message: mapContactSendErrorMessage(details),
        ...(process.env.NODE_ENV === "development" ? { details } : {}),
      },
      { status: 500 },
    );
  }
}

function mapContactSendErrorMessage(details: string) {
  if (
    details.includes("SMTP is not configured") ||
    details.includes("SMTP_HOST")
  ) {
    return "Hệ thống email chưa được cấu hình. Vui lòng liên hệ quản trị viên.";
  }

  if (
    details.includes("BadCredentials") ||
    details.includes("Username and Password not accepted") ||
    details.includes("Invalid login")
  ) {
    return "Không đăng nhập được Gmail SMTP. Hãy dùng App Password (mật khẩu ứng dụng) cho SMTP_PASS, không dùng mật khẩu Gmail thường.";
  }

  return "Không gửi được thông tin. Vui lòng thử lại sau.";
}
