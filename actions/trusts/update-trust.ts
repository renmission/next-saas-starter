"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { TrustStatus, TrustType } from "@prisma/client";

import { prisma } from "@/lib/db";

interface UpdateTrustInput {
  trustId: string;
  name?: string;
  type?: TrustType;
  clientAnswers?: Record<string, any>;
}

export async function updateTrust(data: UpdateTrustInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const trust = await prisma.trust.findUnique({
      where: { id: data.trustId },
      select: { clientId: true, professionalId: true },
    });

    if (!trust) {
      throw new Error("Trust not found");
    }

    if (
      trust.clientId !== session.user.id &&
      trust.professionalId !== session.user.id
    ) {
      throw new Error("You are not authorized to update this trust");
    }

    const result = await prisma.trust.update({
      where: { id: data.trustId },
      data: {
        name: data.name,
        type: data.type,
        clientAnswers: data.clientAnswers,
        status: TrustStatus.IN_PROGRESS,
      },
    });

    revalidatePath("/dashboard/trusts");

    return { status: "success", data: result };
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
}
