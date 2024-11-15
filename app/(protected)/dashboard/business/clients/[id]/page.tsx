import { redirect } from "next/navigation";
import { getBusinessClientById } from "@/actions/business/get-client";

import { getCurrentUser } from "@/lib/session";
import { ClientInfo } from "@/components/business/client-info";
import { DashboardHeader } from "@/components/dashboard/header";
import { InviteClientButton } from "@/components/dashboard/invite-client-button";
import { Forms } from "@/components/form";
import FormCreateButton from "@/components/form/form-create-button";

export default async function ClientPage({
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
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <DashboardHeader
          heading={`Business Client`}
          text="Manage your client"
        />
        <div className="flex items-center gap-4">
          <FormCreateButton />
          <InviteClientButton />
        </div>
      </div>

      <ClientInfo client={client} />

      <Forms client={client.id} />
    </>
  );
}
