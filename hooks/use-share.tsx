import { useCallback, useState } from "react";
import { toast } from "sonner";

interface ShareData {
  title: string;
  text?: string;
  url: string;
}

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  const share = useCallback(async (data: ShareData) => {
    setIsSharing(true);

    try {
      if (canShare) {
        await navigator.share(data);
        toast.success("Shared successfully!");
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(data.url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        // User cancelled the share
        try {
          await navigator.clipboard.writeText(data.url);
          toast.success("Link copied to clipboard!");
        } catch {
          toast.error("Failed to share");
        }
      }
    } finally {
      setIsSharing(false);
    }
  }, [canShare]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
      return true;
    } catch {
      toast.error("Failed to copy");
      return false;
    }
  }, []);

  return {
    share,
    copyToClipboard,
    isSharing,
    canShare,
  };
}
