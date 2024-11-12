import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { MultiStepForm } from "@/components/forms/multi-step-form";
import { defaultFormSteps } from "@/components/forms/multi-step-form/form-steps";
import { UserNameForm } from "@/components/forms/user-name-form";
import { UserRoleForm } from "@/components/forms/user-role-form";

export default async function trustPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  return (
    <>
      <DashboardHeader heading="Trusts" text="Manage trust" />

      <MultiStepForm steps={defaultFormSteps} />
    </>
  );
}
