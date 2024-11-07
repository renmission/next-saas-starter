export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "select"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onSubmit: (data: Record<string, any>) => void;
}
