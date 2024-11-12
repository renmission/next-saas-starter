import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function ViewPaymentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  // TODO: Fetch payment details using params.id
  const payment = { id: params.id, amount: "$300.00", status: "Completed" };

  return (
    <>
      <DashboardHeader
        heading={`Payment Details: Transaction ${params.id}`}
        text={`View payment details for transaction ${params.id}`}
      />
      <div className="grid gap-8">
        {/* Add more payment details here */}
        <p>Transaction ID: {params.id}</p>
        <p>Payment Amount: {payment.amount}</p>
        <p>Payment Status: {payment.status}</p>
      </div>
    </>
  );
}
