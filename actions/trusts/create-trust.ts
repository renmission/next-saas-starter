"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { TrustStatus, TrustType } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getTrustQuestionsByTrustType } from "@/components/forms/trusts-form/data";

import { createTrustPayment } from "../stripe/stripe-trust-payment";

interface CreateTrustInput {
  name: string;
  type: TrustType;
  clientId?: string;
  businessId: string;
}

export async function createTrust(data: CreateTrustInput) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.id) {
      throw new Error("Unauthorized: User ID is required");
    }

    if (!data.businessId) {
      throw new Error("Business ID is required");
    }

    // if (!payment.paymentId) {
    //   throw new Error("Payment ID is required");
    // }

    // const isPaymentExists = await prisma.trustPayment.findUnique({
    //   where: { id: payment.paymentId, status: "completed" },
    // });

    // if (!isPaymentExists) {
    //   throw new Error("Payment not found or not completed");
    // }

    const docs = getTrustQuestionsByTrustType(data.type as any);

    const documentsJson = JSON.parse(JSON.stringify(docs));

    // Testing Purpose
    const clientId = "cm49w4w0i0006ds56gs6ya3h5";
    data.clientId = clientId;

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
        // payment: {
        //   connect: {
        //     id: payment.paymentId,
        //   },
        // },
      },
    });

    revalidatePath("/dashboard/business");

    return { status: "success", trust: newTrust };
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
}
