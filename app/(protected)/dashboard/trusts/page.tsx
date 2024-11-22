import { redirect } from "next/navigation";
import { getClientTrusts } from "@/actions/trusts/get-trust";
import { Trust } from "@/types";

import { getCurrentUser } from "@/lib/session";
import { getFirstName } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { TrustCard } from "@/components/trusts/trust-card";

export default async function trustPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const firstName = getFirstName(user.name);

  const trusts = await getClientTrusts();

  console.log("Trusts:", trusts);

  return (
    <>
      <DashboardHeader
        heading={`Hello ${firstName},`}
        text="Welcome back!, Below are the list of your trust."
      />

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {trusts.length ? (
          trusts.map((trust: Trust) => (
            <TrustCard
              key={trust.id}
              id={trust.id}
              name={trust.name}
              type={trust.type}
              status={trust.status}
              documents={trust.documents}
              createdAt={trust.createdAt}
              updatedAt={trust.updatedAt}
              businessId={trust.businessId}
              professional={trust.professional}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No trusts found.</p>
        )}
      </div>
    </>
  );
}
