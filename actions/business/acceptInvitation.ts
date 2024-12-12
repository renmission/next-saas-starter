"use server";

import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/db";

interface AcceptClientInvitationInput {
  token: string;
  email: string;
  name: string;
}

export async function acceptClientInvitation({
  token,
  email,
  name,
}: AcceptClientInvitationInput) {
  try {
    // Verify the invitation token
    const invitation = await prisma.clientInvitation.findUnique({
      where: { token },
    });

    if (!invitation || invitation.expiresAt < new Date()) {
      return { success: false, error: "Invalid or expired invitation" };
    }

    // Create or update the user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        role: UserRole.CLIENT,
        businessId: invitation.businessId,
      },
      create: {
        email,
        name,
        role: UserRole.CLIENT,
        businessId: invitation.businessId,
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error accepting invitation:", error);
    return { success: false, error: "Failed to accept invitation" };
  }
}
