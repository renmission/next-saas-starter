import { redirect } from "next/navigation";
import { getTrustById } from "@/actions/trusts/get-trust";

import { getCurrentUser } from "@/lib/session";
import { TrustForm } from "@/components/forms/trusts-form";
import { TrustInfoDisplay } from "@/components/trusts/trust-info";

export default async function TrustPage({
  params,
  searchParams,
}: {
  params: { trustId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const trust = await getTrustById(params.trustId);

  if (!trust) redirect("/dashboard/business");

  const isEditMode = searchParams.mode === "edit";
  const isAnswerMode = trust.status === "PENDING" && user.role === "CLIENT";

  const trustFormSteps = Array.isArray(trust.documents)
    ? trust.documents.map((doc: any) => ({
        title: doc.title,
        description: doc.description,
        fields: Array.isArray(doc.fields) ? doc.fields : [],
      }))
    : [];

  if (isEditMode) {
    return (
      <>
        <h1 className="mb-4 text-2xl font-bold">Edit Trust</h1>
        <TrustForm
          steps={trustFormSteps}
          trustId={params.trustId}
          existingData={trust.clientAnswers as Record<string, any>}
          mode="edit"
        />
      </>
    );
  } else if (isAnswerMode) {
    return (
      <>
        <h1 className="mb-4 text-2xl font-bold">
          Answer Questions: {trust.name}
        </h1>
        <TrustForm
          steps={trustFormSteps}
          trustId={params.trustId}
          mode="create"
        />
      </>
    );
  }
  // View mode
  return <TrustInfoDisplay trust={trust} />;
}
