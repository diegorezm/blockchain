"use client";

import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SquareMenu } from "lucide-react";
import { useState } from "react";
import { Navigation } from "./navigation";

export function MobileSidebar() {
  const [isSheetOpenLeft, setIsSheetOpenLeft] = useState(false);
  return (
    <div className="block px-4 lg:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsSheetOpenLeft(true)}
      >
        <SquareMenu className="size-6" />
      </Button>
      <Sheet
        open={isSheetOpenLeft}
        onClose={() => setIsSheetOpenLeft(false)}
        side="left"
      >
        <Navigation />
      </Sheet>
    </div>
  );
}
