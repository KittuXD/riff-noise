import { cn } from "@/lib/utils";

interface AdBannerProps {
  position: "top" | "sidebar" | "inline" | "footer";
  className?: string;
}

export function AdBanner({ position, className }: AdBannerProps) {
  const sizes = {
    top: "h-24 md:h-32",
    sidebar: "h-64",
    inline: "h-32",
    footer: "h-24",
  };

  return (
    <div
      className={cn(
        "bg-accent/50 border border-dashed border-border rounded-sm flex items-center justify-center",
        sizes[position],
        className
      )}
    >
      <div className="text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          Advertisement
        </p>
        <p className="text-sm text-muted-foreground">
          {position === "top" && "728x90 Leaderboard"}
          {position === "sidebar" && "300x250 Medium Rectangle"}
          {position === "inline" && "728x90 Leaderboard"}
          {position === "footer" && "728x90 Leaderboard"}
        </p>
      </div>
    </div>
  );
}
