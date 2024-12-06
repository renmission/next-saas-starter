"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useCreateTrustModal } from "@/components/modals/trusts/create-trust-modal";

import { Icons } from "../shared/icons";

interface AddTrustButtonProps {
  businessId: string;
}

const AddTrustButton = ({ businessId, clientId }) => {
  const { setShowCreateTrustModal, CreateTrustModal } = useCreateTrustModal({
    businessId,
    clientId,
  });

  return (
    <>
      <CreateTrustModal />
      <Button variant="outline" onClick={() => setShowCreateTrustModal(true)}>
        <Icons.folderPlus className="mr-2 size-4" />
        Add Trust
      </Button>
    </>
  );
};

export default AddTrustButton;
