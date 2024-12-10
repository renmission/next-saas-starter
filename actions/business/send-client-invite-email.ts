"use server";

import ClientInvitationEmail from "@/emails/client-invitation";

import { siteConfig } from "@/config/site";
import { resend } from "@/lib/email";

import { createClientInvitation } from "./create-client-invitation";

interface SendClientInviteEmailInput {
  email: string;
  inviterName: string;
  inviterEmail: string;
  businessName: string;
  invitationToken: string;
}

export async function sendClientInviteEmail(input: SendClientInviteEmailInput) {
  const invitationUrl = `${siteConfig.url}/invite/client/${input.invitationToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${input.inviterName} <${input.inviterEmail}>`,
      to: input.email,
      subject: `You've been invited to join ${input.businessName}`,
      react: ClientInvitationEmail({
        inviterName: input.inviterName,
        businessName: input.businessName,
        invitationUrl,
        clientName: "John Doe", // TODO: Replace with actual client name
      }),
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw new Error("Failed to send invitation email");
    }

    return { message: "Invite email sent successfully!" };
  } catch (error) {
    console.error("Error sending client invite email:", error);
    throw new Error("Failed to send invite email");
  }
}
