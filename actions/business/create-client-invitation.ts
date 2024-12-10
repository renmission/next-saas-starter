"use server";

import crypto from "crypto";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";

interface CreateClientInvitationInput {
  email: string;
  businessId: string;
}

export async function createClientInvitation(
  input: CreateClientInvitationInput,
) {
  const session = await auth();
  const user = session?.user;

  if (!session?.user || !user || !user.id) {
    throw new Error("Unauthorized");
  }

  const invitationToken = crypto.randomBytes(20).toString("hex");

  try {
    const invitation = await prisma.clientInvitation.create({
      data: {
        email: input.email,
        inviterId: user.id,
        businessId: input.businessId,
        token: invitationToken,
      },
      include: {
        business: {
          select: { name: true },
        },
      },
    });

    return { invitation, invitationToken };
  } catch (error) {
    console.error("Error creating client invitation:", error);
    throw new Error("Failed to create client invitation");
  }
}
