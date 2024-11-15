"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export async function deleteBusinessForm(formId: string) {
  try {
    // Authenticate the user.
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    // Delete the business form by ID and owner.
    await prisma.form.delete({
      where: {
        id: formId,
        creator: { id: session.user.id },
      },
    });

    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
