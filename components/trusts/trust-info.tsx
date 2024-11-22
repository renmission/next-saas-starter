import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/shared/icons";
import { PrintButton } from "@/components/shared/print-button";

import { TrustAnswersDisplay } from "./trust-answer";

interface TrustInfoDisplayProps {
  trust: Record<string, any>;
  onEdit?: () => void;
}

export function TrustInfoDisplay({ trust, onEdit }: TrustInfoDisplayProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
    <Card className="mx-auto w-full max-w-7xl print:border-none print:shadow-none">
      <CardHeader className="border-b print:border-none">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{trust.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <PrintButton />

            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="print:hidden"
              >
                <Icons.settings className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 print:pt-0">
        <div className="space-y-6 print:space-y-4">
          <section>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:grid-cols-3">
              <div>
                <dt className="font-medium text-gray-500">
                  <Icons.calendar className="mr-2 inline-block h-4 w-4 print:hidden" />
                  Created At
                </dt>
                <dd className="mt-1">{formatDate(trust.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">
                  <Icons.clock className="mr-2 inline-block h-4 w-4 print:hidden" />
                  Updated At
                </dt>
                <dd className="mt-1">{formatDate(trust.updatedAt)}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">
                  <Icons.user className="mr-2 inline-block h-4 w-4 print:hidden" />
                  Professional
                </dt>
                <dd className="mt-1">
                  {trust.professional.name} <br />
                  <span className="text-sm text-gray-500">
                    {trust.professional.email}
                  </span>
                </dd>
              </div>

              <div className="print:hidden">
                <dt className="font-medium text-gray-500">
                  <Icons.user className="mr-2 inline-block h-4 w-4 print:hidden" />
                  Status
                </dt>
                <dd className="mt-1">
                  <Badge
                    variant={
                      trust.status === "PENDING"
                        ? "secondary"
                        : trust.status === "COMPLETED"
                          ? "default"
                          : "outline"
                    }
                    className="print:hidden"
                  >
                    {trust.status}
                  </Badge>
                </dd>
              </div>
            </dl>
          </section>

          <Separator className="print:hidden" />

          <section className="print:hidden">
            <h3 className="mb-2 text-lg font-semibold">Trust Progress</h3>
            <Progress
              value={getProgressPercentage(trust.status)}
              className="w-full"
            />
          </section>

          <Separator className="print:hidden" />

          <TrustAnswersDisplay clientAnswers={trust.clientAnswers} />
        </div>
      </CardContent>
    </Card>
  );
}
