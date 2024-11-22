"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useUpdateClientModal } from "@/components/modals/business/update-client-modal";
import { Icons } from "@/components/shared/icons";

interface UpdateBusinessClientProps {
  clientId: string;
  clientName: string;
}

const UpdateBusinessClient: React.FC<UpdateBusinessClientProps> = ({
  clientId,
  clientName,
}) => {
  const { setShowUpdateClientModal, setClientToUpdate, UpdateClientModal } =
    useUpdateClientModal();

  const isPaidPlan = true; // Replace with actual logic to check if user is on a paid plan

  const handleDeleteClick = () => {
    if (!isPaidPlan) {
      toast.error("Updating clients is only available on paid plans.");
      return;
    }
    setClientToUpdate({ id: clientId, name: clientName });
    setShowUpdateClientModal(true);
  };
  return (
    <>
      <UpdateClientModal />
      <Button
        variant="outline"
        onClick={handleDeleteClick}
        disabled={!isPaidPlan}
      >
        <Icons.settings className="size-4 text-blue-700" />
      </Button>
    </>
  );
};

export default UpdateBusinessClient;
