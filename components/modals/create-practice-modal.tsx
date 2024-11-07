import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/icons";

function CreatePracticeModal({
  showCreatePracticeModal,
  setShowCreatePracticeModal,
}: {
  showCreatePracticeModal: boolean;
  setShowCreatePracticeModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Add your practice creation logic here
    try {
      // API call or data handling
      setTimeout(() => {
        setShowCreatePracticeModal(false);
      }, 400);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      showModal={showCreatePracticeModal}
      setShowModal={setShowCreatePracticeModal}
    >
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <Icons.add className="size-10" />
          <h3 className="font-urban text-2xl font-bold">Create Practice</h3>
          <p className="text-sm text-gray-500">
            Create a new practice session to track your progress
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <div className="space-y-2">
            <Label htmlFor="name">Practice Name</Label>
            <Input
              id="name"
              placeholder="Enter practice name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter practice description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            variant="default"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.add className="mr-2 size-4" />
            )}{" "}
            Create Practice
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export function useCreatePracticeModal() {
  const [showCreatePracticeModal, setShowCreatePracticeModal] = useState(false);

  const CreatePracticeModalCallback = useCallback(() => {
    return (
      <CreatePracticeModal
        showCreatePracticeModal={showCreatePracticeModal}
        setShowCreatePracticeModal={setShowCreatePracticeModal}
      />
    );
  }, [showCreatePracticeModal, setShowCreatePracticeModal]);

  return useMemo(
    () => ({
      setShowCreatePracticeModal,
      CreatePracticeModal: CreatePracticeModalCallback,
    }),
    [setShowCreatePracticeModal, CreatePracticeModalCallback],
  );
}
