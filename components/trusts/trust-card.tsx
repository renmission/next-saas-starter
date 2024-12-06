import Link from "next/link";
import { Trust } from "@/types";
import { UserRole } from "@prisma/client";

import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/shared/icons";
import IconsItem from "@/components/shared/icons-item";

interface TrustCardProps extends Trust {
  userRole: UserRole;
}

export async function TrustCard({
  id,
  name,
  createdAt,
  businessId,
  status,
  professional,
  userRole,
}: TrustCardProps) {
  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-xl font-bold text-primary sm:text-2xl">
            {name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground sm:space-y-2">
          <IconsItem
            icon={<Icons.calendar className="h-5 w-5 text-blue-700" />}
            label="Created Date"
            value={formatDate(createdAt)}
            badge={{
              variant: "outline",
              className: "text-sm capitalize",
            }}
          />
          <IconsItem
            icon={<Icons.user className="h-5 w-5 text-blue-700" />}
            label="Created By"
            value={professional.name as string}
            badge={{
              variant: "outline",
              className: "text-sm capitalize",
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch justify-end gap-2 border-t pt-4 sm:flex-row">
        {status === "IN_PROGRESS" && userRole === "CLIENT" && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Link
              href={`/dashboard/business/${businessId}/trusts/${id}?mode=edit`}
              className="flex w-full items-center justify-center"
            >
              <Icons.filePenLine className="mr-2 size-4 text-blue-700" />
              Update
            </Link>
          </Button>
        )}

        {status !== "PENDING" && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Link
              href={`/dashboard/trusts/${id}`}
              className="flex w-full items-center justify-center"
            >
              <Icons.externalLink className="mr-2 size-4 text-blue-700" />
              View Documents
            </Link>
          </Button>
        )}

        {status === "PENDING" && userRole === "CLIENT" && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Link
              href={`/dashboard/business/${businessId}/trusts/${id}`}
              className="flex w-full items-center justify-center"
            >
              <Icons.folderUp className="mr-2 size-4 text-blue-700" />
              Answer Questions
            </Link>
          </Button>
        )}

        {status === "PENDING" && userRole === "PROFESSIONAL" && (
          <Button
            disabled
            variant="outline"
            size="sm"
            className="disabled w-full cursor-not-allowed sm:w-auto"
          >
            <Link href="#" className="flex w-full items-center justify-center">
              <Icons.clock className="mr-2 size-4 text-blue-700" />
              Waiting for client to answer
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
