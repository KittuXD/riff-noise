import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link  from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  accent?: string;
  href?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ title, accent, href, className, children }: SectionHeaderProps) {
  return (
    <motion.div
      className={cn("flex items-center justify-between mb-8", className)}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-3xl md:text-4xl tracking-wider">
        {title}
        {accent && <span className="text-primary text-glow"> {accent}</span>}
      </h2>
      <div className="flex items-center gap-4">
        {children}
        {href && (
          <Link
            href={href}
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary hover:opacity-80 transition-all"
          >
            View All{" "}
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
