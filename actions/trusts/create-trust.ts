"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { TrustStatus, TrustType } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getTrustQuestionsByTrustType } from "@/components/forms/trusts-form/data";

interface CreateTrustInput {
  name: string;
  type: TrustType;
  clientId?: string;
  businessId: string;
}

export async function createTrust(data: CreateTrustInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!data.businessId) {
      throw new Error("Client ID and Business ID are required");
    }

    const docs = getTrustQuestionsByTrustType(data.type as any);

    const documentsJson = JSON.parse(JSON.stringify(docs));

    // Testing Purpose
    // const clientId = "cm3svrwvu0006ewnpx3i9fv0r";
    // data.clientId = clientId;

    const newTrust = await prisma.trust.create({
      data: {
        name: data.name,
        type: data.type,
        status: TrustStatus.PENDING,
        documents: documentsJson,
        business: {
          connect: {
            id: data.businessId,
          },
        },
        professional: {
          connect: {
            id: session.user.id,
          },
        },
        client: {
          connect: {
            id: data.clientId,
          },
        },
      },
    });

    revalidatePath("/dashboard/business");

    return { status: "success", trust: newTrust };
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
}
