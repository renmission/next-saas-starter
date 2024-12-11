"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { deleteBusinessClient } from "@/actions/business/delete-client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/icons";

interface DeleteClientModalProps {
  showDeleteClientModal: boolean;
  setShowDeleteClientModal: Dispatch<SetStateAction<boolean>>;
  clientId: string;
  clientName: string;
}

function DeleteClientModal({
  showDeleteClientModal,
  setShowDeleteClientModal,
  clientId,
  clientName,
}: DeleteClientModalProps) {
  const { data: session } = useSession();
  const [deleting, setDeleting] = useState(false);
  const [verificationInput, setVerificationInput] = useState("");
  const router = useRouter();

  const handleDeleteClient = async () => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to delete a client.");
      return;
    }

    setDeleting(true);
    try {
      const result = await deleteBusinessClient(clientId);
      console.log("Deleted client:", result);
      if (result.status === "success") {
        setShowDeleteClientModal(false);

        router.replace("/dashboard/business");

        router.refresh();
      } else {
        throw new Error("Failed to delete client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal
      showModal={showDeleteClientModal}
      setShowModal={setShowDeleteClientModal}
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.warning className="size-10 text-red-500" />
        <h3 className="text-lg font-medium">Delete Client</h3>
        <p className="text-center text-sm text-gray-500">
          This action is irreversible. Are you sure you want to delete the
          client
          <span className="font-semibold"> {clientName}</span>?
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(handleDeleteClient(), {
            loading: `Deleting client...`,
            success: `Client ${clientName} deleted successfully!`,
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label
            htmlFor="verify-delete"
            className="block text-sm text-gray-700"
          >
            To verify, type{" "}
            <span className="font-semibold">
              {" "}
              &quot;delete {clientName}&quot;{" "}
            </span>
            below
          </label>
          <Input
            id="verify-delete"
            name="verification"
            type="text"
            value={verificationInput}
            onChange={(e) => setVerificationInput(e.target.value)}
            placeholder={`delete ${clientName}`}
            className="mt-1 block w-full"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={verificationInput !== `delete ${clientName}` || deleting}
          className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
        >
          {deleting ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Icons.trash className="mr-2 size-4" />
              Delete Client
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

export function useDeleteClientModal() {
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const DeleteClientModalCallback = useCallback(() => {
    return clientToDelete ? (
      <DeleteClientModal
        showDeleteClientModal={showDeleteClientModal}
        setShowDeleteClientModal={setShowDeleteClientModal}
        clientId={clientToDelete.id}
        clientName={clientToDelete.name}
      />
    ) : null;
  }, [showDeleteClientModal, clientToDelete]);

  return useMemo(
    () => ({
      setShowDeleteClientModal,
      setClientToDelete,
      DeleteClientModal: DeleteClientModalCallback,
    }),
    [setShowDeleteClientModal, DeleteClientModalCallback],
  );
}
