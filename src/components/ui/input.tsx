import { cn } from "@/utils/cn";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "border-2 border-surface rounded-lg p-2 bg-transparent text-foreground focus:border-primary focus:outline-none transition-colors duration-400",
        className,
      )}
      {...props}
    />
  );
}
