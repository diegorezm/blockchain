import React, { useRef } from "react";
import { Dialog } from "./dialog";
import { X } from "lucide-react";

type SheetProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  side: "left" | "right";
};

export function Sheet({ children, open, onClose, side }: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetPosition = side === "left" ? "left-0" : "right-0";
  const sheetTransform = open
    ? "translate-x-0"
    : side === "left"
      ? "-translate-x-full"
      : "translate-x-full";
  const transitionClasses = "transition-transform duration-300 ease-in-out";

  return (
    <Dialog open={open} onClose={onClose}>
      <div
        ref={sheetRef}
        className={`fixed top-0 px-4 bottom-0 ${sheetPosition} w-full bg-background text-foreground shadow-lg ${transitionClasses} ${sheetTransform}`}
      >
        <div className="w-full py-2 flex justify-end">
          <button className="hover:cursor-pointer" onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </Dialog>
  );
}
