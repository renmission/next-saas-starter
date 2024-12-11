import { EmailConfig } from "next-auth/providers/email";
import { Resend } from "resend";

import { env } from "@/env.mjs";

export const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationRequest: EmailConfig["sendVerificationRequest"] =
  async (params) => {
    const { identifier, url, provider } = params;

    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_APP_URL}/api/send-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier, url, provider }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification request:", error);
      throw new Error("Failed to send verification email");
    }
  };
