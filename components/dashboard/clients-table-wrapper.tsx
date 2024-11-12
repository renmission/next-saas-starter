import { auth } from "@/auth";

import { getBusinessClients } from "@/lib/business";

import { ClientsTable } from "./client-table";

export async function ClientsTableWrapper() {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email || !user.id) {
    throw new Error("Unauthorized");
  }

  const fetchedData = await getBusinessClients(user.id);
  const data = fetchedData ?? [];
  return <ClientsTable initialData={data} />;
}
