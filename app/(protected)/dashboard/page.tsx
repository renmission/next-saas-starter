import { getCurrentUser } from "@/lib/session";
import { constructMetadata, getFirstName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

import { sampleInfoCardData } from "../admin/page";

export const metadata = constructMetadata({
  title: "Dashboard – SaaS Starter",
  description: "Create and manage content.",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const firstName = getFirstName(user?.name);

  return (
    <>
      <DashboardHeader
        heading={`Hello ${firstName},`}
        text="Below are your dashboard statistics."
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sampleInfoCardData.map((cardData) => (
            <InfoCard
              key={cardData.title}
              title={cardData.title}
              total={cardData.total}
              icon={cardData.icon}
              percentage={cardData.percentage}
            />
          ))}
        </div>
      </div>
    </>
  );
}
