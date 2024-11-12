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

interface ClientInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  client: Client;
}

export function ClientInfo({ client }: ClientInfoProps) {
  const { id, name, status, priority, createdAt } = client;

  const createdDate = formatDate(createdAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Client Details
        </CardTitle>
        <CardDescription>Client ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p className="text-base">{name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Priority
            </h3>
            <Badge variant={priority === "high" ? "destructive" : "outline"}>
              {priority}
            </Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Status
            </h3>
            <Badge variant={status === "completed" ? "secondary" : "default"}>
              {status}
            </Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Created Date
            </h3>
            <p className="text-base">{createdDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
