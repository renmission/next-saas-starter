"use client";

import { useState } from "react";

import { FormCard } from "./form-card";

interface Form {
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

interface FormWrapperProps {
  initialData: Form[];
}

const FormWrapper: React.FC<FormWrapperProps> = ({ initialData }) => {
  const [forms, setForms] = useState<Form[]>(initialData);

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
            <FormCard key={form.id} {...form} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormWrapper;
