"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="print:hidden"
    >
      <Icons.printer className="mr-2 h-4 w-4" />
      Print
    </Button>
  );
}
