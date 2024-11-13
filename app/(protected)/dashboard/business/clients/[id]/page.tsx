import { redirect } from "next/navigation";
import { getBusinessClientById } from "@/actions/business/get-client";

import { getCurrentUser } from "@/lib/session";
import { ClientInfo } from "@/components/dashboard/client-info";
import { DashboardHeader } from "@/components/dashboard/header";
import { InviteClientButton } from "@/components/dashboard/invite-client-button";
import { AddTrustQuestionnaire } from "@/components/dashboard/trust/add-trust-questionnaire";

export default async function ViewTransactionPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const client = await getBusinessClientById(params.id);

  if (!client) redirect("/dashboard/business/clients");

  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading={`Business Clients`}
          text="Manage your clients."
        />
        <InviteClientButton />
      </div>

      <ClientInfo client={client} />

      <div className="mt-4 flex justify-end">
        <AddTrustQuestionnaire clientId={client.id} />
      </div>
    </>
  );
}
