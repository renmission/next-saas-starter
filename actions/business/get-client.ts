"use server";

import { prisma } from "@/lib/db";

export async function getBusinessById(id: string) {
  try {
    const clients = await prisma.business.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        priority: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        owner: true,
        clients: true,
        trusts: true,
      },
    });

    return clients;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBusinessClients(userId: string) {
  try {
    const clients = await prisma.business.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        name: true,
        priority: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return clients;
  } catch (error) {
    console.error(error);
    return null;
  }
}
