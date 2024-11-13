"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export type FormData = {
  name: string;
};

export async function updateBusinessClient(clientId: string, data: FormData) {
  try {
    // Authenticate the user.
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    // Update the business client by ID and owner.
    await prisma.business.update({
      where: {
        id: clientId,
        owner: { id: session.user.id },
      },
      data: {
        name: data.name,
      },
    });

    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
