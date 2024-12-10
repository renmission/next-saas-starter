"use server";

import { auth } from "@/auth";

import { createClientInvitation } from "./create-client-invitation";
import { sendClientInviteEmail } from "./send-client-invite-email";

interface SendClientInviteInput {
  email: string;
  businessId: string;
}

export async function sendClientInvite(input: SendClientInviteInput) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session?.user || !user || !user.id) {
      throw new Error("Unauthorized");
    }

    const { invitation, invitationToken } = await createClientInvitation(input);

    await sendClientInviteEmail({
      email: input.email,
      inviterName: user.name || "Lenny Whiting",
      inviterEmail: user.email || "lenny@cpaattorney.com",
      businessName: invitation.business.name || "our business",
      invitationToken,
    });

    return { message: "Invite sent successfully!" };
  } catch (error) {
    console.error("Error in sendClientInvite:", error);
    return { error: "Failed to send invite." };
  }
}
