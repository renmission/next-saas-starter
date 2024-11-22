import { redirect } from "next/navigation";
import { getTrustById } from "@/actions/trusts/get-trust";

import { getCurrentUser } from "@/lib/session";
import { TrustInfoDisplay } from "@/components/trusts/trust-info";

export default async function trustIdPage({
  params,
}: {
  params: { trustId: string };
}) {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const docs = await getTrustById(params.trustId);

  console.log("Trusts:", docs);

  if (!docs) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Trust Not Found</h1>
        <p>The requested trust could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <TrustInfoDisplay trust={docs} />
    </>
  );
}
