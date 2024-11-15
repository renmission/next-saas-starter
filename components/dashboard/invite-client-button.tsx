"use client";

import { Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInviteClientModal } from "@/components/modals/invite-client-modal";
import { Icons } from "@/components/shared/icons";

export function InviteClientButton() {
  const { setShowInviteClientModal, InviteClientModal } =
    useInviteClientModal();

  return (
    <>
      <Button onClick={() => setShowInviteClientModal(true)}>
        <Icons.send className="mr-2 size-4" />
        Invite a client
      </Button>
      <InviteClientModal />
    </>
  );
}
