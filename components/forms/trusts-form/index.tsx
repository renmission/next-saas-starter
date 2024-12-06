"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateTrust } from "@/actions/trusts/update-trust";
import { submitTrustAnswers } from "@/actions/user/update-trust-answer";
import { ChevronRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { DatePicker } from "@/components/shared/date-picker";

import { FormField, FormStep } from "./types";

interface TrustFormProps {
  steps: FormStep[];
  trustId: string;
  existingData?: Record<string, any>;
  mode: "edit" | "create";
}

export function TrustForm({
  steps,
  trustId,
  existingData,
  mode,
}: TrustFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(
    existingData || {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigation = useRouter();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(
      (field) =>
        !field.required ||
        (formData[field.name] && formData[field.name].trim() !== ""),
    );
  };

  async function handleSubmit() {
    if (!isStepValid()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === steps.length - 1) {
      try {
        setIsSubmitting(true);

        let result: any;
        if (mode === "create") {
          result = await submitTrustAnswers({
            trustId: trustId,
            clientAnswers: formData,
          });
        } else {
          result = await updateTrust({
            trustId: trustId,
            name: formData.name,
            type: formData.type,
            clientAnswers: formData,
          });
        }

        if (result.status === "success") {
          toast({
            title: "Success",
            description: `Trust ${mode === "create" ? "created" : "updated"} successfully!`,
          });

          navigation.refresh();
          navigation.replace(`/dashboard/trusts/${trustId}`);

          setFormData({});
          // setCurrentStep(0);
        } else {
          throw new Error("Operation failed");
        }
      } catch (error) {
        console.error(
          `Error ${mode === "create" ? "creating" : "updating"} trust:`,
          error,
        );
        toast({
          title: "Error",
          description:
            error.message ||
            `Something went wrong while ${mode === "create" ? "creating" : "updating"} the trust. Please try again.`,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      "aria-label": field.label,
      required: field.required,
    };

    switch (field.type) {
      case "select":
        return (
          <Select
            value={formData[field.name] || ""}
            onValueChange={(value) => handleInputChange(field.name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            {...commonProps}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="min-h-[100px]"
          />
        );

      case "date":
        return (
          <DatePicker
            date={
              formData[field.name] ? new Date(formData[field.name]) : undefined
            }
            setDate={(date) =>
              handleInputChange(field.name, date ? date.toISOString() : "")
            }
          />
        );

      default:
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="mx-auto w-full">
      {/* Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            toast({
              title: "Creating form...",
              description: "Please wait while we process your submission.",
            });
            await handleSubmit();
            toast({
              title: "Success",
              description: "Form created successfully!",
            });
          } catch (error) {
            toast({
              title: "Error",
              description:
                error.message || "An error occurred while creating the form.",
              variant: "destructive",
            });
          }
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            {steps[currentStep].description && (
              <CardDescription>
                {steps[currentStep].description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {steps[currentStep].fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </Label>
                {renderField(field)}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button type="submit" disabled={isSubmitting || !isStepValid()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : currentStep === steps.length - 1 ? (
                "Submit"
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
