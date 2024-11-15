import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { ClientsTableWrapper } from "@/components/business";
import { CreateNewBusinessClientSection } from "@/components/business/create-new-client";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Business Settings",
  description: "Configure your business.",
});

export default async function BusinessPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Business" text="Manage your business." />
        <CreateNewBusinessClientSection />
      </div>
      <div className="flex flex-col gap-5">
        <ClientsTableWrapper />
      </div>
    </>
  );
}
