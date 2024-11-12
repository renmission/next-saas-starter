"use client";

import React from "react";
import { toast } from "sonner";

// import { useSubscription } from "@/hooks/use-subscription"; // Assume this hook exists
import { Button } from "@/components/ui/button";
import { useDeleteClientModal } from "@/components/modals/business/delete-client-modal";
import { Icons } from "@/components/shared/icons";

interface DeleteBusinessClientProps {
  clientId: string;
  clientName: string;
}

const DeleteBusinessClient: React.FC<DeleteBusinessClientProps> = ({
  clientId,
  clientName,
}) => {
  const { DeleteClientModal, setShowDeleteClientModal, setClientToDelete } =
    useDeleteClientModal();
  //   const { isPaidPlan } = useSubscription();
  const isPaidPlan = true; // Replace with actual logic to check if user is on a paid plan

  const handleDeleteClick = () => {
    if (!isPaidPlan) {
      toast.error("Deleting clients is only available on paid plans.");
      return;
    }
    setClientToDelete({ id: clientId, name: clientName });
    setShowDeleteClientModal(true);
  };

  return (
    <>
      <DeleteClientModal />
      <Button
        className="w-full bg-red-800 text-white hover:bg-red-700"
        onClick={handleDeleteClick}
        disabled={!isPaidPlan}
      >
        <Icons.trash className="size-4" />
      </Button>
    </>
  );
};

export default DeleteBusinessClient;
