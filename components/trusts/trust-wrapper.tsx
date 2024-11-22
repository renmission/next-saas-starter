"use client";

import { useState } from "react";
import { Trust } from "@/types";

import { TrustCard } from "./trust-card";

interface TrustProps {
  initialData: Trust[];
}

const TrustWrapper: React.FC<TrustProps> = ({ initialData }) => {
  const [forms, setForms] = useState<Trust[]>(initialData);

  console.log("Trust forms:", forms);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Forms</h2>
      </div>
      {forms.length === 0 ? (
        <p className="text-muted-foreground">No forms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {forms.map((form) => (
            <TrustCard key={form.id} {...form} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrustWrapper;
