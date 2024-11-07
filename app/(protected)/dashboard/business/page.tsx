import { redirect } from "next/navigation";
import { Handshake } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateNewBusinessTransactionSection } from "@/components/dashboard/create-new-transaction";
import DashboardDataCard from "@/components/dashboard/data-card";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import TransactionsList from "@/components/dashboard/transactions-list";
import { Icons } from "@/components/shared/icons";

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
        <CreateNewBusinessTransactionSection />
      </div>
      <div className="flex flex-col gap-5">
        <TransactionsList />
      </div>
    </>
  );
}
