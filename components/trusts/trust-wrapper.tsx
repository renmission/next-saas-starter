"use client";

import { useState } from "react";
import { Trust } from "@/types";
import { UserRole } from "@prisma/client";

import { TrustCard } from "./trust-card";

interface TrustWrapperProps {
  userRole: UserRole;
  data: Trust[];
}

const TrustWrapper = ({ data, userRole }: TrustWrapperProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trusts</h2>
      </div>
      {data.length === 0 ? (
        <p className="text-muted-foreground">No forms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.map((item) => (
            <TrustCard key={item.id} {...item} userRole={userRole} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrustWrapper;
