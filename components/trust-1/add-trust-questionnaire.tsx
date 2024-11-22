"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/shared/icons";

export function AddTrustQuestionnaire({ clientId }: { clientId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddTrust = async (
    trustType: "NEVADA_ASSET_PROTECTION" | "NEVADA_DYNASTY",
  ) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to create a new trust
      // For now, we'll just simulate this by redirecting to a new page
      router.push(
        `/dashboard/trust/new?clientId=${clientId}&trustType=${trustType}`,
      );
    } catch (error) {
      console.error("Failed to add trust:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Icons.add className="mr-2 size-4" />
          Add Trust
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8">
        <DropdownMenuItem
          onClick={() => handleAddTrust("NEVADA_ASSET_PROTECTION")}
          disabled={isLoading}
          className="cursor-pointer hover:bg-accent focus:bg-accent"
        >
          Nevada Asset Protection
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleAddTrust("NEVADA_DYNASTY")}
          className="cursor-pointer hover:bg-accent focus:bg-accent"
          disabled={isLoading}
        >
          Nevada Dynasty
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
