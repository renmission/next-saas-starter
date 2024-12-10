"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { TrustStatus, TrustType } from "@prisma/client";
import Stripe from "stripe";

import { prisma } from "@/lib/db";
import { getTrustQuestionsByTrustType } from "@/components/forms/trusts-form/data";

import { createTrustPayment } from "../stripe/stripe-trust-payment";
import { getUserById } from "../user/get-user";

interface CreateTrustInput {
  name: string;
  type: TrustType;
  clientId?: string | null;
  businessId: string;
  payment: Stripe.Checkout.Session;
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

    const docs = getTrustQuestionsByTrustType(data.type as any);

    const documentsJson = JSON.parse(JSON.stringify(docs));

    // clientId is for testing Purpose | clientId is not required on creating businesses.
    // const clientId = "cm4hmxqsc000013j8dunt9j7k";
    // const client = await prisma.trust.findUnique({ where: { id: clientId } });
    // data.clientId = !client ? clientId : "";

    // TODO: Create condition if clientId is provided else just create trust with no client.
    // TODO: clientId is not required on creating businesses or trusts.
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
        // client: {
        //   connect: {
        //     id: data.clientId,
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
