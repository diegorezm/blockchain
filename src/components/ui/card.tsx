import { cn } from "@/utils/cn";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  variant?: "primary" | "secondary" | "outline" | "surface" | "ghost";
};

export function Card({ variant = "primary", className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 w-full",
        variant === "primary" && "bg-primary text-on-primary",
        variant === "secondary" && "bg-secondary text-on-secondary",
        variant === "secondary" && "bg-secondary text-on-secondary",
        variant === "surface" && "bg-surface text-on-surface",
        variant === "outline" && "border-1 border-foreground",
        variant === "ghost" && "shadow-surface shadow-sm",
        className,
      )}
      {...props}
    />
  );
}
