import Link from "next/link";

import { formatDate, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteFormModal } from "@/components/modals/forms/delete-form-modal";
import { Icons } from "@/components/shared/icons";
import IconsItem from "@/components/shared/icons-item";

import { FormDeleteButton } from "./form-delete-button";

interface FormCardProps {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  businessId: string;
  creator: {
    email: string | null;
    name: string | null;
  };
}

export function FormCard({
  id,
  name,
  description,
  createdAt,
  updatedAt,
  businessId,
  creator,
}: FormCardProps) {
  const desc = description || "No description provided.";
  const truncatedDescription = truncate(desc, 150);

  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-xl font-bold text-primary sm:text-2xl">
            <Link
              href={`/dashboard/business/${businessId}/forms/${id}`}
              className="flex w-full items-center justify-center"
            >
              {name}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {truncatedDescription}
        </p>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
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
            icon={<Icons.calendar className="h-5 w-5 text-blue-700" />}
            label="Updated Date"
            value={formatDate(updatedAt)}
            badge={{
              variant: "outline",
              className: "text-sm capitalize",
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch justify-end gap-2 border-t pt-4 sm:flex-row">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Link
            href={`/dashboard/business/${businessId}/forms/${id}`}
            className="flex w-full items-center justify-center"
          >
            <Icons.eye className="mr-2 h-4 w-4 text-blue-700" />
            View
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Link
            href={`/dashboard/business/${businessId}/forms/${id}/edit`}
            className="flex w-full items-center justify-center"
          >
            <Icons.filePenLine className="mr-2 h-4 w-4 text-blue-700" />
            Edit
          </Link>
        </Button>
        <FormDeleteButton formId={id} formName={name} />
      </CardFooter>
    </Card>
  );
}
