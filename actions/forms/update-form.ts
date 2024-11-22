"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export type FormData = {
  name: string;
  description?: string;
};

export async function updateBusinessForm(formId: string, formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await prisma.form.update({
      where: {
        id: formId,
        creator: { id: session.user.id },
      },
      data: {
        name: formData.name,
        description: formData.description,
      },
    });

    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
