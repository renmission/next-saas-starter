import { DashboardHeader } from "@/components/dashboard/header";
import { SkeletonSection } from "@/components/shared/section-skeleton";

export default function DashboardBusinessLoading() {
  return (
    <>
      <DashboardHeader heading="Business" text="Manage your business." />
      <div className="divide-y divide-muted pb-10">
        <SkeletonSection />
        <SkeletonSection />
        <SkeletonSection card />
      </div>
    </>
  );
}
