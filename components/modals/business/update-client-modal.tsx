import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { updateBusinessClient } from "@/actions/business/update-client"; // You'll need to create this action
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/icons";

interface Client {
  id: string;
  name: string;
}

function UpdateClientModal({
  showUpdateClientModal,
  setShowUpdateClientModal,
  client,
}: {
  showUpdateClientModal: boolean;
  setShowUpdateClientModal: Dispatch<SetStateAction<boolean>>;
  client: Client;
}) {
  const { data: session } = useSession();
  const [updating, setUpdating] = useState(false);
  const [clientName, setClientName] = useState(client.name);
  const router = useRouter();

  async function updateClient() {
    setUpdating(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated.");
      }
      const result = await updateBusinessClient(client.id, {
        name: clientName,
      });
      if (result) {
        setShowUpdateClientModal(false);
        router.refresh();
      } else {
        toast.error("Failed to update client. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update client. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Modal
      showModal={showUpdateClientModal}
      setShowModal={setShowUpdateClientModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.squarePen className="size-10 text-primary" />
        <h3 className="text-lg font-semibold">Update Client</h3>
        <p className="text-center text-sm text-muted-foreground">
          Update the name for your client.
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(updateClient(), {
            loading: "Updating client...",
            success: "Client updated successfully!",
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium">
            Client Name
          </label>
          <Input
            type="text"
            name="clientName"
            id="clientName"
            required
            autoFocus
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mt-1 w-full border bg-background"
          />
        </div>

        <Button
          type="submit"
          variant={updating ? "outline" : "default"}
          disabled={
            updating || !clientName.trim() || clientName === client.name
          }
        >
          {updating ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Icons.post className="mr-2 size-4" />
              Update Client
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

export function useUpdateClientModal() {
  const [showUpdateClientModal, setShowUpdateClientModal] = useState(false);
  const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);

  const UpdateClientModalCallback = useCallback(() => {
    return clientToUpdate ? (
      <UpdateClientModal
        showUpdateClientModal={showUpdateClientModal}
        setShowUpdateClientModal={setShowUpdateClientModal}
        client={clientToUpdate}
      />
    ) : null;
  }, [showUpdateClientModal, clientToUpdate]);

  return useMemo(
    () => ({
      setShowUpdateClientModal,
      setClientToUpdate,
      UpdateClientModal: UpdateClientModalCallback,
    }),
    [setShowUpdateClientModal, UpdateClientModalCallback],
  );
}
