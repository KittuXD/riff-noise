"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookmarkButtonProps {
  articleId: string;
  articleTitle?: string;
  size?: "sm" | "default";
  className?: string;
}

export function BookmarkButton({
  articleId,
  articleTitle,
  size = "default",
  className,
}: BookmarkButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isBookmarked = isFavorite(articleId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(articleId);
    
    if (isBookmarked) {
      toast.success("Removed from bookmarks");
    } else {
      toast.success(articleTitle ? `"${articleTitle}" added to bookmarks` : "Added to bookmarks");
    }
  };

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "icon" : "default"}
      className={cn(
        "relative group/bookmark",
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        className
      )}
      onClick={handleClick}
      aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isBookmarked ? "filled" : "empty"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Bookmark
            className={cn(
              "h-4 w-4 transition-colors",
              isBookmarked
                ? "fill-primary text-primary"
                : "text-muted-foreground group-hover/bookmark:text-foreground"
            )}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Ripple effect on toggle */}
      <AnimatePresence>
        {isBookmarked && (
          <motion.div
            className="absolute inset-0 rounded-md bg-primary/20"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </Button>
  );
}
