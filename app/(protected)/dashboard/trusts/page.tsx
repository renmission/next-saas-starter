import { redirect, useParams } from "next/navigation";
import { getClientTrusts } from "@/actions/trusts/get-trust";
import { Trust } from "@/types";

import { getCurrentUser } from "@/lib/session";
import { getFirstName } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import AddTrustButton from "@/components/trusts/create-button";
import { TrustCard } from "@/components/trusts/trust-card";

export default async function trustPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const firstName = getFirstName(user.name);

  const { data, businessId } = await getClientTrusts();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <DashboardHeader
          heading={`Hello ${firstName},`}
          text="Welcome back!, Below are the list of your trust."
        />

        <AddTrustButton businessId={businessId} clientId={user.id} />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {data.length ? (
          data.map((trust: Trust) => (
            <TrustCard key={trust.id} {...trust} userRole={user.role} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No trusts found.</p>
        )}
      </div>
    </>
  );
}
