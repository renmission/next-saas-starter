import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { createNewBusinessClient } from "@/actions/business/add-client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/icons";

function CreateClientModal({
  showCreateClientModal,
  setShowCreateClientModal,
}: {
  showCreateClientModal: boolean;
  setShowCreateClientModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const [creating, setCreating] = useState(false);
  const [clientName, setClientName] = useState("");
  const router = useRouter();

  async function createClient() {
    setCreating(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated.");
      }
      const result = await createNewBusinessClient({
        name: clientName,
        owner: {
          connect: {
            id: session.user.id,
          },
        },
      });
      if (result) {
        setShowCreateClientModal(false);
        router.refresh();
      } else {
        toast.error("Failed to create client. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to create client. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <Modal
      showModal={showCreateClientModal}
      setShowModal={setShowCreateClientModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.handshake className="size-10 text-primary" />
        <h3 className="text-lg font-semibold">Add New Client</h3>
        <p className="text-center text-sm text-muted-foreground">
          Enter a name for your new client.
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(createClient(), {
            loading: "Creating client...",
            success: "Client created successfully!",
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
          variant={creating ? "outline" : "default"}
          disabled={creating || !clientName.trim()}
        >
          {creating ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Icons.add className="mr-2 size-4" />
              Create Client
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

export function useCreateClientModal() {
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);

  const CreateClientModalCallback = useCallback(() => {
    return (
      <CreateClientModal
        showCreateClientModal={showCreateClientModal}
        setShowCreateClientModal={setShowCreateClientModal}
      />
    );
  }, [showCreateClientModal, setShowCreateClientModal]);

  return useMemo(
    () => ({
      setShowCreateClientModal,
      CreateClientModal: CreateClientModalCallback,
    }),
    [setShowCreateClientModal, CreateClientModalCallback],
  );
}
