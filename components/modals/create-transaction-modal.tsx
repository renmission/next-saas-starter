import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/icons";

function CreateTransactionModal({
  showCreateTransactionModal,
  setShowCreateTransactionModal,
}: {
  showCreateTransactionModal: boolean;
  setShowCreateTransactionModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const [creating, setCreating] = useState(false);
  const [transactionName, setTransactionName] = useState("");

  async function createTransaction() {
    setCreating(true);
    await fetch(`/api/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: transactionName }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          setShowCreateTransactionModal(false);
          toast.success("Transaction created successfully!");
        } else {
          const error = await res.text();
          throw error;
        }
      })
      .finally(() => {
        setCreating(false);
      });
  }

  return (
    <Modal
      showModal={showCreateTransactionModal}
      setShowModal={setShowCreateTransactionModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.handshake className="size-10 text-primary" />
        <h3 className="text-lg font-semibold">Create New Transaction</h3>
        <p className="text-center text-sm text-muted-foreground">
          Enter a name for your new transaction.
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(createTransaction(), {
            loading: "Creating transaction...",
            success: "Transaction created successfully!",
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label
            htmlFor="transactionName"
            className="block text-sm font-medium"
          >
            Transaction Name
          </label>
          <Input
            type="text"
            name="transactionName"
            id="transactionName"
            required
            autoFocus
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            className="mt-1 w-full border bg-background"
          />
        </div>

        <Button
          type="submit"
          variant={creating ? "outline" : "default"}
          disabled={creating || !transactionName.trim()}
        >
          {creating ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Icons.add className="mr-2 size-4" />
              Create Transaction
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

// ... rest of the file remains the same

export function useCreateTransactionModal() {
  const [showCreateTransactionModal, setShowCreateTransactionModal] =
    useState(false);

  const CreateTransactionModalCallback = useCallback(() => {
    return (
      <CreateTransactionModal
        showCreateTransactionModal={showCreateTransactionModal}
        setShowCreateTransactionModal={setShowCreateTransactionModal}
      />
    );
  }, [showCreateTransactionModal, setShowCreateTransactionModal]);

  return useMemo(
    () => ({
      setShowCreateTransactionModal,
      CreateTransactionModal: CreateTransactionModalCallback,
    }),
    [setShowCreateTransactionModal, CreateTransactionModalCallback],
  );
}
