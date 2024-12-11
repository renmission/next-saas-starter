import { NextRequest, NextResponse } from "next/server";
import { MagicLinkEmail } from "@/emails/magic-link-email";

import { siteConfig } from "@/config/site";
import { resend } from "@/lib/email";
import { getUserByEmail } from "@/lib/user";

export async function POST(request: NextRequest) {
  const { identifier, url, provider } = await request.json();

  const user = await getUserByEmail(identifier);
  if (!user || !user.name) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  const userVerified = user?.emailVerified ? true : false;
  const authSubject = userVerified
    ? `Sign-in link for ${siteConfig.name}`
    : "Activate your account";

  try {
    const { data, error } = await resend.emails.send({
      from: provider.from,
      to:
        process.env.NODE_ENV === "development"
          ? "delivered@resend.dev"
          : identifier,
      subject: authSubject,
      react: MagicLinkEmail({
        firstName: user.name,
        actionUrl: url,
        mailType: userVerified ? "login" : "register",
        siteName: siteConfig.name,
      }),
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return NextResponse.json(
      { message: "Failed to send verification email" },
      { status: 500 },
    );
  }
}
