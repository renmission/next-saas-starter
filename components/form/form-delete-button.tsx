"use client";

import { Button } from "@/components/ui/button";
import { useDeleteFormModal } from "@/components/modals/forms/delete-form-modal";
import { Icons } from "@/components/shared/icons";

interface FormDeleteButtonProps {
  formId: string;
  formName: string;
}

export function FormDeleteButton({ formId, formName }: FormDeleteButtonProps) {
  const { DeleteFormModal, setFormToDelete, setShowDeleteFormModal } =
    useDeleteFormModal();

  const handleDeleteClick = () => {
    setFormToDelete({ id: formId, name: formName });
    setShowDeleteFormModal(true);
  };

  return (
    <>
      <DeleteFormModal />
      <Button
        variant="destructive"
        size="sm"
        className="w-full sm:w-auto"
        onClick={handleDeleteClick}
      >
        <Icons.trash className="mr-2 h-4 w-4" />
        Move to Trash
      </Button>
    </>
  );
}
