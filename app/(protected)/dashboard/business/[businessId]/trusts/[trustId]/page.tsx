import { redirect } from "next/navigation";
import { getTrustById } from "@/actions/trusts/get-trust";

import { getCurrentUser } from "@/lib/session";
import { TrustForm } from "@/components/forms/trusts-form";

export default async function FormPage({
  params,
}: {
  params: { trustId: string };
}) {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const trust = await getTrustById(params.trustId);

  if (!trust) redirect("/dashboard/business");

  const trustFormSteps = Array.isArray(trust.documents)
    ? trust.documents.map((doc: any) => ({
        title: doc.title,
        description: doc.description,
        fields: Array.isArray(doc.fields) ? doc.fields : [],
      }))
    : [];

  return (
    <>
      <TrustForm
        steps={trustFormSteps}
        trustId={params.trustId}
        mode="create"
      />
    </>
  );
}
