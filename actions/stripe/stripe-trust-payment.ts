"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Stripe from "stripe";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export type TrustPaymentResponse = {
  status: "success" | "error";
  stripeUrl?: string;
  error?: string;
  paymentId: string;
};

const trustsUrl = absoluteUrl("/dashboard");

export async function createTrustPayment(
  businessId: string,
): Promise<TrustPaymentResponse> {
  let redirectUrl: string = "";

  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.id || !user.email) {
      throw new Error("Unauthorized or missing user information");
    }

    // Create a Stripe Checkout session
    const params: Stripe.Checkout.SessionCreateParams = {
      success_url:
        user.role === "PROFESSIONAL"
          ? `${trustsUrl}/business/${businessId}?success=true`
          : `${trustsUrl}/trusts?success=true`,
      cancel_url:
        user.role === "PROFESSIONAL"
          ? `${trustsUrl}/business/${businessId}?canceled=true`
          : `${trustsUrl}/trusts?canceled=true`,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Trust Creation Fee",
            },
            unit_amount: Number(process.env.STRIPE_TRUST_CREATION_FEE) * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        businessId: businessId,
      },
    };

    const stripeSession = await stripe.checkout.sessions.create(params);

    if (!stripeSession.url) {
      throw new Error("Failed to create Stripe session");
    }

    // Create a TrustPayment record
    const payment = await prisma.trustPayment.create({
      data: {
        professionalId: user.id,
        businessId: businessId,
        stripeSessionId: stripeSession.id,
        status: "pending",
        amount: Number(process.env.STRIPE_TRUST_CREATION_FEE),
      },
    });

    redirectUrl = stripeSession.url as string;
  } catch (error) {
    console.error("Error creating trust payment:", error);
    return {
      status: "error",
      error: "Failed to create trust payment",
      paymentId: "",
    };
  }

  redirect(redirectUrl);
}
