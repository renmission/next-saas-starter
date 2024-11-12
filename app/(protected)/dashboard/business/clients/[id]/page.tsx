import { redirect } from "next/navigation";

import { getBusinessClientById } from "@/lib/business";
import { getCurrentUser } from "@/lib/session";
import { ClientInfo } from "@/components/dashboard/client-info";
import { DashboardHeader } from "@/components/dashboard/header";
import { InviteClientButton } from "@/components/dashboard/invite-client-button";

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
      <div className="grid gap-2">
        <ClientInfo client={client} />
      </div>
    </>
  );
}
