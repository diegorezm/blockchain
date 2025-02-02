import {Loader2Icon} from "lucide-react";
import {Button, type ButtonProps} from "@/app/_components/ui/button";
import {cn} from "@/app/_lib/utils";

export function LoaderButton({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps & {isLoading: boolean}) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      {...props}
      className={cn("flex justify-center px-3 gap-2", className)}
    >
      {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
      {children}
    </Button>
  );
}
