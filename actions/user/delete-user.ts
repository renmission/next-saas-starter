"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export async function deleteUser() {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const currentUserId = session.user.id;

    await prisma.$transaction(async (tx) => {
      // Delete associated businesses
      await tx.business.deleteMany({
        where: { ownerId: currentUserId },
      });

      // Delete associated accounts
      await tx.account.deleteMany({
        where: { userId: currentUserId },
      });

      // Delete associated sessions
      await tx.session.deleteMany({
        where: { userId: currentUserId },
      });

      // Delete the user
      await tx.user.delete({
        where: { id: currentUserId },
      });
    });

    // Clear session and revalidate
    revalidatePath("/");
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return { success: false, message: "Failed to delete user" };
  }
}
