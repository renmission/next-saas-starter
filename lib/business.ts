import { prisma } from "@/lib/db";

export async function getBusinessClientById(id: string) {
  try {
    const clients = await prisma.business.findUnique({ where: { id } });

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
