import * as React from "react";
import { Client } from "@/types";

import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UpdateBusinessClient from "@/components/business/update-business-client";
import { Icons } from "@/components/shared/icons";

import IconsItem from "../shared/icons-item";

interface ClientInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  client: Client;
}

export function ClientInfo({ client }: ClientInfoProps) {
  const { id, name, status, priority, createdAt } = client;
  const createdDate = formatDate(createdAt);

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="text-white">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <Avatar className="size-12 border-2 border-white">
              <AvatarImage
                src={`https://avatar.vercel.sh/${id}.png`}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                {name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Client since {createdDate}
              </p>
            </div>
          </div>
          <UpdateBusinessClient clientId={id} clientName={name} />
        </div>
      </CardHeader>
      <CardContent className="border-t p-6">
        <div className="grid-col-1 md:grid-col-2 grid gap-6 lg:grid-cols-3">
          <IconsItem
            icon={<Icons.flag className="size-5 text-blue-700" />}
            label="Priority"
            value={priority}
            badge={{
              variant: priority === "high" ? "destructive" : "outline",
              className: "text-sm capitalize",
            }}
          />
          <IconsItem
            icon={<Icons.circleCheck className="size-5 text-blue-700" />}
            label="Status"
            value={status}
            badge={{
              variant: status === "completed" ? "default" : "outline",
              className: "text-sm capitalize",
            }}
          />
          <IconsItem
            icon={<Icons.mail className="size-5 text-blue-700" />}
            label="Invitation"
            value={
              client.invitationAccepted
                ? "Accepted"
                : client.invitationSent
                  ? "Invited"
                  : "Accepted" // TODO: For demonstration purposes, change to "Uninvited" later
            }
            badge={{
              variant: client.invitationAccepted
                ? "default"
                : client.invitationSent
                  ? "secondary"
                  : "default", // TODO: For demonstration purposes, change to "outline" later
              className: "text-sm capitalize",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
