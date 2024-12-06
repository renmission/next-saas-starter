import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ClientLoading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Business" text="Manage your business." />
        <div className="flex items-center gap-4">
          <Button disabled variant="outline">
            <Skeleton className="h-4 w-[100px]" />
          </Button>
          <Button disabled variant="default">
            <Skeleton className="h-4 w-[100px]" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
      <DashboardHeader heading="Trusts" text="" />
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-2 gap-6 divide-muted pb-6">
          <Skeleton className="h-[300px] w-[550px] rounded-lg" />
          <Skeleton className="h-[300px] w-[550px] rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-6 divide-muted pb-10">
          <Skeleton className="h-[300px] w-[550px] rounded-lg" />
          <Skeleton className="h-[300px] w-[550px] rounded-lg" />
        </div>
      </div>
    </>
  );
}
