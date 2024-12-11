import { getTrustByBusinessId } from "@/actions/trusts/get-trust";
import { auth } from "@/auth";
import { Trust } from "@/types";

import TrustWrapper from "./trust-wrapper";

export async function Trusts({ client }: { client: string }) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email || !user.id) {
    throw new Error("Unauthorized");
  }

  const result = await getTrustByBusinessId(client);
  const trust: Trust[] = result ?? [];
  return <TrustWrapper data={trust} userRole={user.role} />;
}
