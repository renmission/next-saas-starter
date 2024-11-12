"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export async function deleteBusinessClient(clientId: string) {
  try {
    // Authenticate the user.
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    // Delete the business client by ID and owner.
    await prisma.business.delete({
      where: {
        id: clientId,
        owner: { id: session.user.id },
      },
    });

    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
