import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/shared/icons";
import { PrintButton } from "@/components/shared/print-button";

import { TrustAnswersDisplay } from "./trust-answer";
import { TrustProgress } from "./trust-progress";

interface TrustInfoDisplayProps {
  trust: Record<string, any>;
  onEdit?: () => void;
}

export function TrustInfoDisplay({ trust, onEdit }: TrustInfoDisplayProps) {
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
            <TrustProgress status={trust.status} />
          </section>

          <Separator className="print:hidden" />

          <TrustAnswersDisplay clientAnswers={trust.clientAnswers} />
        </div>
      </CardContent>
    </Card>
  );
}
