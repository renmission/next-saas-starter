import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { updateBusinessForm } from "@/actions/forms/update-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/shared/icons";

interface Form {
  id: string;
  name: string;
  description?: string;
}

function UpdateFormModal({
  showUpdateFormModal,
  setShowUpdateFormModal,
  form,
}: {
  showUpdateFormModal: boolean;
  setShowUpdateFormModal: Dispatch<SetStateAction<boolean>>;
  form: Form;
}) {
  const { data: session } = useSession();
  const [updating, setUpdating] = useState(false);
  const [formName, setFormName] = useState(form.name);
  const [formDescription, setFormDescription] = useState(form.description);
  const router = useRouter();

  async function updateFormData() {
    setUpdating(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated.");
      }
      const result = await updateBusinessForm(form.id, {
        name: formName,
        description: formDescription,
      });
      if (result) {
        setShowUpdateFormModal(false);
        // router.refresh();
        window.location.reload(); // TODO: Implement a more efficient way to refresh the page
      } else {
        toast.error("Failed to update form. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update form. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Modal
      showModal={showUpdateFormModal}
      setShowModal={setShowUpdateFormModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.filePenLine className="size-10 text-primary" />
        <h3 className="text-lg font-semibold">Update Form</h3>
        <p className="text-center text-sm text-muted-foreground">
          Update the details for your form.
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(updateFormData(), {
            loading: "Updating form...",
            success: "Form updated successfully!",
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label htmlFor="formName" className="block text-sm font-medium">
            Form Name
          </label>
          <Input
            type="text"
            name="formName"
            id="formName"
            required
            autoFocus
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="mt-1 w-full border bg-background"
          />
        </div>

        <div>
          <label
            htmlFor="formDescription"
            className="block text-sm font-medium"
          >
            Form Description
          </label>
          <Textarea
            name="formDescription"
            id="formDescription"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="mt-1 w-full border bg-background"
          />
        </div>

        <Button
          type="submit"
          variant={updating ? "outline" : "default"}
          disabled={
            updating ||
            (!formName.trim() && formDescription === form.description) ||
            (formName === form.name && formDescription === form.description)
          }
        >
          {updating ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Icons.squarePen className="mr-2 size-4" />
              Update Form
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

export function useUpdateFormModal() {
  const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
  const [formToUpdate, setFormToUpdate] = useState<Form | null>(null);

  const UpdateFormModalCallback = useCallback(() => {
    return formToUpdate ? (
      <UpdateFormModal
        showUpdateFormModal={showUpdateFormModal}
        setShowUpdateFormModal={setShowUpdateFormModal}
        form={formToUpdate}
      />
    ) : null;
  }, [showUpdateFormModal, formToUpdate]);

  return useMemo(
    () => ({
      setShowUpdateFormModal,
      setFormToUpdate,
      UpdateFormModal: UpdateFormModalCallback,
    }),
    [setShowUpdateFormModal, UpdateFormModalCallback],
  );
}
