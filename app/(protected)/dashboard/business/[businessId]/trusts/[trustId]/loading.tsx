import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ClientLoading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Form" text="Manage your form." />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </>
  );
}
