"use client";

import { Button } from "@/components/ui/button";
import { useInviteClientModal } from "@/components/modals/invite-client-modal";

export function InviteClientButton() {
  const { setShowInviteClientModal, InviteClientModal } =
    useInviteClientModal();

  return (
    <>
      <Button onClick={() => setShowInviteClientModal(true)}>
        Invite a client
      </Button>
      <InviteClientModal />
    </>
  );
}
