import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-border text-foreground",
        metal: "bg-genre-metal text-primary-foreground",
        punk: "bg-genre-punk text-background",
        emo: "bg-genre-emo text-primary-foreground",
        hardcore: "bg-genre-hardcore text-primary-foreground",
        alternative: "bg-genre-alternative text-primary-foreground",
        rock: "bg-genre-rock text-primary-foreground",
        metalcore: "bg-genre-metalcore text-primary-foreground",
        post: "bg-genre-post text-primary-foreground",
        breaking: "bg-primary text-primary-foreground animate-pulse",
        featured: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground",
        sponsored: "bg-accent text-muted-foreground border border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
