import { Inbox, type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3D9]">
        <Icon className="h-5 w-5 text-[#8A5F06]" strokeWidth={1.75} />
      </div>
      <p className="mt-4 font-display text-base font-semibold">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          size="sm"
          className="mt-6 bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
