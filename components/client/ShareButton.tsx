"use client"
import { motion } from "framer-motion";
import { Share2, Twitter, Facebook, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShare } from "@/hooks/use-share";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  url?: string;
  text?: string;
  size?: "sm" | "default";
  className?: string;
}

export function ShareButton({
  title,
  url,
  text,
  size = "default",
  className,
}: ShareButtonProps) {
  const { share, copyToClipboard, isSharing, canShare } = useShare();
  
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || `Check out: ${title}`;

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await share({ title, text: shareText, url: shareUrl });
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await copyToClipboard(shareUrl);
  };

  const handleTwitterShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleFacebookShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  // On mobile with native share, use single button
  if (canShare) {
    return (
      <Button
        variant="ghost"
        size={size === "sm" ? "icon" : "default"}
        className={cn(
          size === "sm" ? "h-8 w-8" : "h-9 w-9",
          className
        )}
        onClick={handleNativeShare}
        disabled={isSharing}
        aria-label="Share"
      >
        <motion.div
          animate={isSharing ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5, repeat: isSharing ? Infinity : 0 }}
        >
          <Share2 className="h-4 w-4" />
        </motion.div>
      </Button>
    );
  }

  // On desktop, show dropdown with options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={size === "sm" ? "icon" : "default"}
          className={cn(
            size === "sm" ? "h-8 w-8" : "h-9 w-9",
            className
          )}
          onClick={(e) => e.preventDefault()}
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTwitterShare} className="cursor-pointer">
          <Twitter className="h-4 w-4 mr-2" />
          Share on X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFacebookShare} className="cursor-pointer">
          <Facebook className="h-4 w-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
