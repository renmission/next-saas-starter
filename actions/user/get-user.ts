"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export async function getUserById(id: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error.message);
    throw new Error("Failed to get user by ID");
  }
}
