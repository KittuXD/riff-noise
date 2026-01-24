import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export function RecentComments() {
  const recentComments = [
    {
      id: 1,
      author: "MetalFan666",
      content: "Great article! Really loved the insights.",
      article: "Death Metal Origins",
      time: "10m ago",
    },
    {
      id: 2,
      author: "DarkLord",
      content: "I disagree with the rating...",
      article: "Album Review: Darkthrone",
      time: "25m ago",
    },
    {
      id: 3,
      author: "ThrasherX",
      content: "Can't wait for this tour!",
      article: "Slayer Final Tour",
      time: "1h ago",
    },
  ];

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div variants={item}>
      <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Comments</CardTitle>
            <CardDescription>Latest user comments</CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Active
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComments.map((comment) => (
              <div key={comment.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {comment.content}
                </p>
                <p className="text-xs text-primary mt-1">
                  on {`"${comment.article}"`}
                </p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            Moderate Comments
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
