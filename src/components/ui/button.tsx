import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-colors duration-500 hover:cursor-pointer rounded-lg font-semibold",
        variant === "primary" &&
          "bg-primary text-on-primary hover:cursor-pointer hover:bg-surface hover:text-on-surface",
        variant === "secondary" &&
          "bg-secondary text-on-secondary hover:opacity-90",
        variant === "outline" &&
          "bg-transparent border-2 border-primary hover:bg-primary hover:text-on-primary",
        variant === "ghost" &&
          "text-foreground hover:bg-surface hover:text-on-surface",

        size === "sm" && "text-sm p-2",
        size === "md" && "text-md px-6 py-2",
        size === "lg" && "text-lg px-12 py-2",

        className,
      )}
      {...props}
    />
  );
}
