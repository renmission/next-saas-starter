import { NextRequest, NextResponse } from "next/server";
import { acceptClientInvitation } from "@/actions/business/acceptInvitation";
import { auth } from "@/auth";

import { absoluteUrl } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!session || !session.user || !token) {
    return NextResponse.redirect("/login");
  }

  try {
    const result = await acceptClientInvitation({
      token,
      email: session.user.email!,
      name: session.user.name || "",
    });

    if (result.success) {
      return NextResponse.redirect(absoluteUrl("/dashboard"));
    } else {
      // Handle error
      return NextResponse.redirect(
        "/error?message=Failed to accept invitation",
      );
    }
  } catch (error) {
    console.error("Error accepting invitation:", error.message);
    return NextResponse.redirect("/error?message=An unexpected error occurred");
  }
}
