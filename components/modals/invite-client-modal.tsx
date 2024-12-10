"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { sendClientInvite } from "@/actions/business/send-client-invite";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/icons";

function InviteClientModal({
  showInviteClientModal,
  setShowInviteClientModal,
  businessId,
}: {
  showInviteClientModal: boolean;
  setShowInviteClientModal: Dispatch<SetStateAction<boolean>>;
  businessId: string;
}) {
  const { data: session } = useSession();
  const [sending, setSending] = useState(false);
  const [clientEmail, setClientEmail] = useState("");

  async function sendInvite() {
    setSending(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated.");
      }
      const result = await sendClientInvite({
        email: clientEmail,
        businessId,
      });
      if (result) {
        setShowInviteClientModal(false);
      } else {
        toast.error("Failed to send invite. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send invite. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal
      showModal={showInviteClientModal}
      setShowModal={setShowInviteClientModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.mail className="size-10 text-primary" />
        <h3 className="text-lg font-semibold">Invite Client</h3>
        <p className="text-center text-sm text-muted-foreground">
          Enter the email address of the client you want to invite.
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(sendInvite(), {
            loading: "Sending invite...",
            success: "Invite sent successfully!",
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium">
            Client Email
          </label>
          <Input
            type="email"
            name="clientEmail"
            id="clientEmail"
            required
            autoFocus
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="mt-1 w-full border bg-background"
          />
        </div>

        <Button
          type="submit"
          variant={sending ? "outline" : "default"}
          disabled={sending || !clientEmail.trim()}
        >
          {sending ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Icons.mail className="mr-2 size-4" />
              Send Invite
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

export function useInviteClientModal({ businessId }) {
  const [showInviteClientModal, setShowInviteClientModal] = useState(false);

  const InviteClientModalCallback = useCallback(() => {
    return (
      <InviteClientModal
        showInviteClientModal={showInviteClientModal}
        setShowInviteClientModal={setShowInviteClientModal}
        businessId={businessId} // Pass business ID as prop to the modal component for dynamic selection of clients.
      />
    );
  }, [showInviteClientModal, setShowInviteClientModal, businessId]);

  return useMemo(
    () => ({
      setShowInviteClientModal,
      InviteClientModal: InviteClientModalCallback,
    }),
    [setShowInviteClientModal, InviteClientModalCallback],
  );
}
