"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { TrustStatus, TrustType, UserRole } from "@prisma/client";
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
  // payment: Stripe.Checkout.Session;
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

    let trustData: any = {
      name: data.name,
      type: data.type,
      status: TrustStatus.PENDING,
      documents: documentsJson,
      business: {
        connect: {
          id: data.businessId,
        },
      },
    };

    if (user.role === UserRole.CLIENT) {
      const business = await prisma.business.findFirst({
        where: { id: data.businessId },
        select: { ownerId: true },
      });
      if (!business) {
        throw new Error("Professional not found for the provided business ID");
      }
      trustData.client = { connect: { id: user.id } };
      trustData.professional = { connect: { id: business.ownerId } };
      trustData.isCreatedByClient = true;
    } else if (user.role === UserRole.PROFESSIONAL) {
      trustData.professional = { connect: { id: user.id } };
      if (data.clientId) {
        trustData.client = { connect: { id: data.clientId } };
      }
    } else {
      throw new Error("Unauthorized: User role is required");
    }

    const newTrust = await prisma.trust.create({ data: trustData });

    revalidatePath("/dashboard/business");

    return { status: "success", trust: newTrust };
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
}
