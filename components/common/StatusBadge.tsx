import React from "react";
import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "danger" | "neutral" | "info";

const toneStyles: Record<StatusTone, string> = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-[#FDF3D9] text-[#8A5F06]",
  danger: "bg-red-50 text-red-700",
  neutral: "bg-muted text-muted-foreground",
  info: "bg-blue-50 text-blue-700",
};

interface StatusBadgeProps {
  label: string;
  tone: StatusTone;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  tone,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-data text-xs font-medium",
        toneStyles[tone],
        className,
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
