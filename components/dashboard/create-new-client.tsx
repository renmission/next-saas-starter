"use client";

import { Button } from "@/components/ui/button";
import { SectionColumns } from "@/components/dashboard/section-columns";
import { useCreateClientModal } from "@/components/modals/create-client-modal";
import { Icons } from "@/components/shared/icons";

export function CreateNewBusinessClientSection() {
  const { setShowCreateClientModal, CreateClientModal } =
    useCreateClientModal();

  const isPaidPlan = true; // Set this to true or false based on your logic

  return (
    <>
      <CreateClientModal />
      {isPaidPlan && (
        <div className="flex items-center">
          <Button
            type="button"
            variant="default"
            className="mr-0"
            onClick={() => setShowCreateClientModal(true)}
          >
            <Icons.add className="mr-2 size-4" />
            <span>Add New Client</span>
          </Button>
        </div>
      )}
    </>
  );
}
