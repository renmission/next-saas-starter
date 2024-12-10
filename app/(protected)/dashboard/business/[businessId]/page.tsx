import { redirect } from "next/navigation";
import { getBusinessClientById } from "@/actions/business/get-client";

import { getCurrentUser } from "@/lib/session";
import { ClientInfo } from "@/components/business/client-info";
import { DashboardHeader } from "@/components/dashboard/header";
import { InviteClientButton } from "@/components/dashboard/invite-client-button";
import { Trusts } from "@/components/trusts";
import FormCreateButton from "@/components/trusts/create-button";
import AddTrustButton from "@/components/trusts/create-button";

export default async function ClientPage({
  params,
}: {
  params: { businessId: string };
}) {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const client = await getBusinessClientById(params.businessId);

  if (!client) redirect("/dashboard/business/clients");

  const isUserClientID = user.role === "CLIENT" ? user.id : client.ownerId;

  return (
    <>
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <DashboardHeader
          heading={`Business Client`}
          text="Manage your client"
        />
        <div className="flex items-center gap-4">
          <AddTrustButton
            businessId={params.businessId}
            clientId={isUserClientID}
          />
          <InviteClientButton businessId={params.businessId} />
        </div>
      </div>

      <ClientInfo client={client} />

      <Trusts client={client.id} />
    </>
  );
}
