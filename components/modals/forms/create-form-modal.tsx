import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { createBusinessForm } from "@/actions/forms/create-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/shared/icons";

function CreateFormModal({
  showCreateFormModal,
  setShowCreateFormModal,
}: {
  showCreateFormModal: boolean;
  setShowCreateFormModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const [creating, setCreating] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const params = useParams();

  async function handleFormCreation() {
    setCreating(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated.");
      }
      const result = await createBusinessForm({
        name: formName,
        description: formDescription,
        businessId: params.businessId as string,
      });

      if (result.status === "success") {
        setShowCreateFormModal(false);
        window.location.reload(); // TODO: Need to implement a more efficient way to refresh the page
      } else {
        toast.error("Failed to add trust. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add trust. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <Modal
      showModal={showCreateFormModal}
      setShowModal={setShowCreateFormModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.add className="size-10 text-primary" />
        <h3 className="text-lg font-semibold">Create New Form</h3>
        <p className="text-center text-sm text-muted-foreground">
          Enter details for your new form.
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(handleFormCreation(), {
            loading: "Creating form...",
            success: "Form created successfully!",
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label htmlFor="formName" className="block text-sm font-medium">
            Name <span className="text-red-600">*</span>
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
            Description
          </label>
          <Textarea
            name="formDescription"
            id="formDescription"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="mt-1 w-full border bg-background"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          variant={creating ? "outline" : "default"}
          disabled={creating || !formName.trim()}
        >
          {creating ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Icons.add className="mr-2 size-4" />
              Add Trust
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

export function useCreateFormModal() {
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);

  const CreateFormModalCallback = useCallback(() => {
    return (
      <CreateFormModal
        showCreateFormModal={showCreateFormModal}
        setShowCreateFormModal={setShowCreateFormModal}
      />
    );
  }, [showCreateFormModal, setShowCreateFormModal]);

  return useMemo(
    () => ({
      setShowCreateFormModal,
      CreateFormModal: CreateFormModalCallback,
    }),
    [setShowCreateFormModal, CreateFormModalCallback],
  );
}
