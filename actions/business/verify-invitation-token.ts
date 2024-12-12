import { prisma } from "@/lib/db";

export async function verifyInvitationToken(token: string) {
  try {
    const invitation = await prisma.clientInvitation.findUnique({
      where: { token },
      include: { business: { select: { id: true, name: true } } },
    });

    if (!invitation) {
      return { valid: false };
    }

    if (invitation.expiresAt < new Date()) {
      return { valid: false };
    }

    return {
      valid: true,
      email: invitation.email,
      businessId: invitation.business.id,
      businessName: invitation.business.name,
    };
  } catch (error) {
    console.error("Error verifying invitation token:", error);
    throw new Error("Failed to verify invitation token");
  }
}
