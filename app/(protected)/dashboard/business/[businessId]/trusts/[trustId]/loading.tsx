import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ClientLoading() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    </>
  );
}
