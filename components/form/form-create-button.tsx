"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useCreateFormModal } from "@/components/modals/forms/create-form-modal";

import { Icons } from "../shared/icons";

const FormCreateButton = () => {
  const { setShowCreateFormModal, CreateFormModal } = useCreateFormModal();
  return (
    <>
      <CreateFormModal />
      <Button variant="outline" onClick={() => setShowCreateFormModal(true)}>
        <Icons.folderPlus className="mr-2 size-4" />
        Create Form
      </Button>
    </>
  );
};

export default FormCreateButton;
