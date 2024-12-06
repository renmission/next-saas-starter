import { Progress } from "@/components/ui/progress";

export function TrustProgress({ status }: { status: string }) {
  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "PENDING":
        return 25;
      case "IN_PROGRESS":
        return 50;
      case "COMPLETED":
        return 100;
      default:
        return 0;
    }
  };
  return (
    <>
      <h3 className="mb-2 text-lg font-semibold">Trust Progress</h3>
      <Progress value={getProgressPercentage(status)} className="w-full" />
    </>
  );
}
