import { getFormsByBusinessId } from "@/actions/forms/get-forms";
import { auth } from "@/auth";

import FormWrapper from "./form-wrapper";

export async function Forms({ client }: { client: string }) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email || !user.id) {
    throw new Error("Unauthorized");
  }

  const result = await getFormsByBusinessId(client);
  const forms = result.forms ?? [];
  return <FormWrapper initialData={forms} />;
}
