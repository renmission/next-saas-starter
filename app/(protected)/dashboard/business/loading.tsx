import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardBusinessLoading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Business" text="Manage your business." />
        <Button disabled>
          <Skeleton className="h-4 w-[200px]" />
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
    </>
  );
}
