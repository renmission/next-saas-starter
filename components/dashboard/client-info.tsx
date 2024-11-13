import * as React from "react";
import { Client } from "@/types";

import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-blue-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage
                src={`https://avatar.vercel.sh/${id}.png`}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{name}</CardTitle>
              <p className="text-sm opacity-75">Client since {createdDate}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 transition-colors hover:bg-white/20"
          >
            <Icons.settings className="size-4 text-white" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid-col-1 md:grid-col-2 grid gap-6 lg:grid-cols-3">
          <InfoItem
            icon={<Icons.flag className="h-5 w-5" />}
            label="Priority"
            value={priority}
            badge={{
              variant: priority === "high" ? "destructive" : "outline",
              className: "text-sm capitalize",
            }}
          />
          <InfoItem
            icon={<Icons.circleCheck className="h-5 w-5" />}
            label="Status"
            value={status}
            badge={{
              variant: status === "completed" ? "secondary" : "default",
              className: "text-sm capitalize",
            }}
          />
          <InfoItem
            icon={<Icons.mail className="h-5 w-5" />}
            label="Invitation"
            value={
              client.invitationAccepted
                ? "Accepted"
                : client.invitationSent
                  ? "Invited"
                  : "Not Invited"
            }
            badge={{
              variant: client.invitationAccepted
                ? "secondary"
                : client.invitationSent
                  ? "default"
                  : "outline",
              className: "text-sm capitalize",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: {
    variant: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
}

function InfoItem({ icon, label, value, badge }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {badge ? (
          <Badge variant={badge.variant} className={badge.className}>
            {value}
          </Badge>
        ) : (
          <p className="text-base font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}
