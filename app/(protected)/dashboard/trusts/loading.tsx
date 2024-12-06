import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";
import { SkeletonSection } from "@/components/shared/section-skeleton";

export default function TrustsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Hello!"
        text="Welcome back!, Below are the list of your trust."
      />
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
