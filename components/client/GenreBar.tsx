import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { genres } from "@/lib/data";

export function GenreBar() {
  return (
    <div className="border-b border-border/50 glass">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto py-3 scrollbar-hide">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
            Explore:
          </span>
          {genres.map((genre, i) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/news?genre=${genre.id}`}>
                <Badge
                  variant={genre.color}
                  className="cursor-pointer hover:scale-110 hover:shadow-glow transition-all duration-300 whitespace-nowrap"
                >
                  {genre.name}
                </Badge>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
