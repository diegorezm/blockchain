import { cn } from "@/utils/cn";

type Props = {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
};

export function DottedSeparator({
  className = "",
  color = "#e2eeee",
  height = "4px",
  dotSize = "4px",
  gapSize = "4px",
  direction = "horizontal",
}: Props) {
  const isHorizontal = direction === "horizontal";
  const dotSizeNum = Number(dotSize) || 2;
  const gapSizeNum = Number(gapSize) || 2;

  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center",
        className,
      )}
    >
      <div
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${dotSizeNum + gapSizeNum}px ${height}`
            : `${height} ${dotSizeNum + gapSizeNum}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
