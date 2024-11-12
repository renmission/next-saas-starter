"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";
import { clientNameSchema } from "@/lib/validations/business";

interface BusinessClientCreateInput {
  name: string;
  owner: {
    connect: {
      id: string;
    };
  };
}

export async function createNewBusinessClient(data: BusinessClientCreateInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const { name } = clientNameSchema.parse(data);

    const newBusiness = await prisma.business.create({
      data: {
        name: name,
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
