"use server";

import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/db";

export async function getTrustById(id: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const trust = await prisma.trust.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        documents: true,
        clientAnswers: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        businessId: true,
        isCreatedByClient: true,
        client: true,
        professional: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return trust;
  } catch (error) {
    console.error(error);
    console.error(error.message);
    throw error;
  }
}

export async function getTrustByBusinessId(businessId: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const trust = await prisma.trust.findMany({
      where: { businessId },
      select: {
        id: true,
        name: true,
        type: true,
        documents: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        businessId: true,
        client: true,
        isCreatedByClient: true,
        professional: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return trust;
  } catch (error) {
    console.error(error);
    console.error(error.message);
    throw error;
  }
}

export async function getClientTrusts() {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (session.user.role !== UserRole.CLIENT) {
      throw new Error("Unauthorized");
    }

    const trusts = await prisma.trust.findMany({
      where: { clientId: session.user.id },
      select: {
        id: true,
        name: true,
        type: true,
        documents: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        businessId: true,
        client: true,
        isCreatedByClient: true,
        professional: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const businessId = trusts.length > 0 ? trusts[0].businessId : null;

    return { data: trusts, businessId };
  } catch (error) {
    console.error(error);
    console.error(error.message);
    throw error;
  }
}
