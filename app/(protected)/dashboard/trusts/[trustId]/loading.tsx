import { Skeleton } from "@/components/ui/skeleton";

export default function TrustsLoading() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-[1000px] w-full rounded-lg" />
      </div>
    </>
  );
}
