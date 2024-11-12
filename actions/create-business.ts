"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";

interface BusinessCreateInput {
  name: string;
  owner: {
    connect: {
      id: string;
    };
  };
}

export async function createNewBusinessClient(data: BusinessCreateInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const newBusiness = await prisma.business.create({
      data: {
        name: data.name,
        owner: {
          connect: { id: session.user.id },
        },
      },
    });

    return { success: true, business: newBusiness };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create new business");
  }
}
