"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: { label: string; value: string }[];
}

interface CreateFormInput {
  name: string;
  description?: string;
  fields?: FormField[];
  businessId: string;
}

export async function createBusinessForm(data: CreateFormInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!data.businessId) {
      throw new Error("Business ID is required");
    }

    const newForm = await prisma.form.create({
      data: {
        name: data.name,
        description: data.description,
        fields: data.fields ? JSON.parse(JSON.stringify(data.fields)) : null,
        business: {
          connect: {
            id: data.businessId,
          },
        },
        creator: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    return { status: "success", form: newForm };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
