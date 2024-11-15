"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export async function getFormsByBusinessId(businessId: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const forms = await prisma.form.findMany({
      where: {
        businessId: businessId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        businessId: true,
        creator: {
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

    return { forms };
  } catch (error) {
    console.error("Error fetching forms:", error);
    return { error: "Failed to fetch forms" };
  }
}
