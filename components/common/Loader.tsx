import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-9 w-9",
};

const Loader: React.FC<LoaderProps> = ({
  label,
  size = "md",
  fullPage,
  className,
}) => {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <Loader2 className={cn(sizeMap[size], "animate-spin text-[#EEB30D]")} />
      {label && (
        <p className="font-data text-xs text-muted-foreground">{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
