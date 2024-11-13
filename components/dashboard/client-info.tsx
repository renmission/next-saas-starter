import * as React from "react";
import { Client } from "@/types";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/shared/icons";

import DeleteBusinessClient from "./business/delete-business-client";

interface ClientInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  client: Client;
}

export function ClientInfo({ client }: ClientInfoProps) {
  const { id, name, status, priority, createdAt } = client;

  const createdDate = formatDate(createdAt);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Icons.user className="h-5 w-5" />
            Client Details
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p className="mt-1 text-lg font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Priority
            </h3>
            <Badge
              variant={priority === "high" ? "destructive" : "outline"}
              className="mt-1 text-base"
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Status
            </h3>
            <Badge
              variant={status === "completed" ? "secondary" : "default"}
              className="mt-1 text-base"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Created Date
            </h3>
            <p className="mt-1 text-base font-medium">{createdDate}</p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex justify-end">
          <Badge variant="outline" className="text-xs">
            Client ID: {id}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
