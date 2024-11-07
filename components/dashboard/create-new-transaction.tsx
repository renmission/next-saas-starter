"use client";

import { Button } from "@/components/ui/button";
import { SectionColumns } from "@/components/dashboard/section-columns";
import { useCreateTransactionModal } from "@/components/modals/create-transaction-modal";
import { Icons } from "@/components/shared/icons";

export function CreateNewBusinessTransactionSection() {
  const { setShowCreateTransactionModal, CreateTransactionModal } =
    useCreateTransactionModal();

  const isPaidPlan = true; // Set this to true or false based on your logic

  return (
    <>
      <CreateTransactionModal />
      <SectionColumns title="" description="">
        {isPaidPlan && (
          <div className="flex items-center">
            <Button
              type="button"
              variant="default"
              onClick={() => setShowCreateTransactionModal(true)}
            >
              <Icons.add className="mr-2 size-4" />
              <span>Create New Transaction</span>
            </Button>
          </div>
        )}
      </SectionColumns>
    </>
  );
}
