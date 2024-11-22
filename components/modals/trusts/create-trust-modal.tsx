import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { createTrust } from "@/actions/trusts/create-trust";
import { TrustType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { formatTrustName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/shared/icons";

function CreateTrustModal({
  showCreateTrustModal,
  setShowCreateTrustModal,
}: {
  showCreateTrustModal: boolean;
  setShowCreateTrustModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const [creating, setCreating] = useState(false);
  const [selectedTrust, setSelectedTrust] = useState<TrustType | null>(null);
  const params = useParams();

  async function handleTrustCreation() {
    if (!selectedTrust) return;

    setCreating(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated.");
      }
      const result = await createTrust({
        name: formatTrustName(selectedTrust),
        type: selectedTrust,
        clientId: params.clientId as string,
        businessId: params.businessId as string,
      });

      if (result.status === "success") {
        setShowCreateTrustModal(false);
        toast.success("Trust created successfully!");
        // TODO: Implement a more efficient way to refresh the data
        window.location.reload();
      } else {
        toast.error("Failed to add trust. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add trust. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  const trustTypes = [
    {
      type: TrustType.NEVADA_ASSET_PROTECTION_TRUST,
      icon: Icons.shieldCheck,
      description: "Protects assets from creditors",
    },
    {
      type: TrustType.NEVADA_DYNASTY_TRUST,
      icon: Icons.users,
      description: "Preserves wealth for future generations",
    },
  ];

  return (
    <Modal
      showModal={showCreateTrustModal}
      setShowModal={setShowCreateTrustModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.add className="size-10 text-primary" />
        <h3 className="text-lg font-semibold">Create New Trust</h3>
        <p className="text-center text-sm text-muted-foreground">
          Select the type of trust you want to create.
        </p>
      </div>

      <div className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16">
        <Select onValueChange={(value) => setSelectedTrust(value as TrustType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a trust type" />
          </SelectTrigger>
          <SelectContent>
            {trustTypes.map((trust) => (
              <SelectItem key={trust.type} value={trust.type}>
                <div className="flex items-center space-x-2">
                  <trust.icon className="size-4" />
                  <span>{trust.type.replace(/_/g, " ")}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedTrust && (
          <p className="text-sm text-muted-foreground">
            {trustTypes.find((t) => t.type === selectedTrust)?.description}
          </p>
        )}

        <Button
          onClick={handleTrustCreation}
          variant={creating ? "outline" : "default"}
          disabled={creating || !selectedTrust}
        >
          {creating ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Icons.add className="mr-2 size-4" />
              Create Trust
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
}

export function useCreateTrustModal() {
  const [showCreateTrustModal, setShowCreateTrustModal] = useState(false);

  const CreateTrustModalCallback = useCallback(() => {
    return (
      <CreateTrustModal
        showCreateTrustModal={showCreateTrustModal}
        setShowCreateTrustModal={setShowCreateTrustModal}
      />
    );
  }, [showCreateTrustModal, setShowCreateTrustModal]);

  return useMemo(
    () => ({
      setShowCreateTrustModal,
      CreateTrustModal: CreateTrustModalCallback,
    }),
    [setShowCreateTrustModal, CreateTrustModalCallback],
  );
}
