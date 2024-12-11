"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { deleteBusinessForm } from "@/actions/forms/delete-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/icons";

interface DeleteFormModalProps {
  showDeleteFormModal: boolean;
  setShowDeleteFormModal: Dispatch<SetStateAction<boolean>>;
  formId: string;
  formName: string;
}

function DeleteFormModal({
  showDeleteFormModal,
  setShowDeleteFormModal,
  formId,
  formName,
}: DeleteFormModalProps) {
  const { data: session } = useSession();
  const [deleting, setDeleting] = useState(false);
  const [verificationInput, setVerificationInput] = useState("");
  const router = useRouter();

  const handleDeleteForm = async () => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to delete a form.");
      return;
    }

    setDeleting(true);
    try {
      const result = await deleteBusinessForm(formId);
      console.log("Deleted form:", result);
      if (result.status === "success") {
        setShowDeleteFormModal(false);
        window.location.reload(); // TODO: Need to implement a more efficient way to refresh the page
      } else {
        throw new Error("Failed to delete form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Failed to delete form. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal
      showModal={showDeleteFormModal}
      setShowModal={setShowDeleteFormModal}
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.warning className="size-10 text-red-500" />
        <h3 className="text-lg font-medium">Delete Form</h3>
        <p className="text-center text-sm text-gray-500">
          This action is irreversible. Are you sure you want to delete the form
          <span className="font-semibold"> {formName}</span>?
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(handleDeleteForm(), {
            loading: `Deleting form...`,
            success: `Form ${formName} deleted successfully!`,
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
              &quot;delete {formName}&quot;{" "}
            </span>
            below
          </label>
          <Input
            id="verify-delete"
            name="verification"
            type="text"
            value={verificationInput}
            onChange={(e) => setVerificationInput(e.target.value)}
            placeholder={`delete ${formName}`}
            className="mt-1 block w-full"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={verificationInput !== `delete ${formName}` || deleting}
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
              Delete Form
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

export function useDeleteFormModal() {
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [formToDelete, setFormToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const DeleteFormModalCallback = useCallback(() => {
    return formToDelete ? (
      <DeleteFormModal
        showDeleteFormModal={showDeleteFormModal}
        setShowDeleteFormModal={setShowDeleteFormModal}
        formId={formToDelete.id}
        formName={formToDelete.name}
      />
    ) : null;
  }, [showDeleteFormModal, formToDelete]);

  return useMemo(
    () => ({
      setShowDeleteFormModal,
      setFormToDelete,
      DeleteFormModal: DeleteFormModalCallback,
    }),
    [setShowDeleteFormModal, DeleteFormModalCallback],
  );
}
