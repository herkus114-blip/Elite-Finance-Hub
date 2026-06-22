import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  
  let colors = "bg-muted text-muted-foreground border-border";
  let dotColor = "bg-muted-foreground";

  if (normalizedStatus === "active" || normalizedStatus === "settled" || normalizedStatus === "completed" || normalizedStatus === "passed") {
    colors = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    dotColor = "bg-emerald-500";
  } else if (normalizedStatus === "pending" || normalizedStatus === "processing") {
    colors = "bg-amber-500/10 text-amber-500 border-amber-500/20";
    dotColor = "bg-amber-500";
  } else if (normalizedStatus === "failed" || normalizedStatus === "rejected" || normalizedStatus === "high risk") {
    colors = "bg-destructive/10 text-destructive border-destructive/20";
    dotColor = "bg-destructive";
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border", colors, className)}>
      <div className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
      {status}
    </div>
  );
}
