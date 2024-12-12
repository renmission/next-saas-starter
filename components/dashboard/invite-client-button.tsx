"use client";

import { Button } from "@/components/ui/button";
import { useInviteClientModal } from "@/components/modals/invite-client-modal";
import { Icons } from "@/components/shared/icons";

export function InviteClientButton({ businessId }: { businessId: string }) {
  const { setShowInviteClientModal, InviteClientModal } = useInviteClientModal({
    businessId,
  });

  return (
    <>
      <Button onClick={() => setShowInviteClientModal(true)}>
        <Icons.send className="mr-2 size-4" />
        Invite client
      </Button>
      <InviteClientModal />
    </>
  );
}
