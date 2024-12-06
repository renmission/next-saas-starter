"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { TrustStatus } from "@prisma/client";

import { prisma } from "@/lib/db";

interface SubmitTrustAnswersInput {
  trustId: string;
  clientAnswers: Record<string, any>;
}

export async function submitTrustAnswers(input: SubmitTrustAnswersInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const trust = await prisma.trust.findUnique({
      where: {
        id: input.trustId,
      },
      select: {
        clientId: true,
        documents: true,
        clientAnswers: true,
      },
    });

    if (!trust) {
      throw new Error("Trust not found");
    }

    if (trust.clientId !== session.user.id) {
      throw new Error("You are not authorized to submit this trust");
    }

    const updatedAnswers = {
      ...((trust.clientAnswers as Record<string, any>) || {}),
      ...input.clientAnswers,
    };

    const result = await prisma.trust.update({
      where: {
        id: input.trustId,
      },
      data: {
        clientAnswers: updatedAnswers,
        status: TrustStatus.IN_PROGRESS,
      },
    });

    revalidatePath("/dashboard/trusts");

    return { status: "success", data: result };
  } catch (error) {
    console.error(error);
    return null;
  }
}
