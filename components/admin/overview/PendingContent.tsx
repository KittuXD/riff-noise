import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PendingContent() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  const pendingContent = [
    {
      id: 1,
      title: "Interview: Morbid Angel's New Direction",
      type: "interview",
      author: "John Doe",
      submitted: "2h ago",
    },
    {
      id: 2,
      title: "Review: Immortal - Northern Chaos Gods",
      type: "review",
      author: "Jane Smith",
      submitted: "5h ago",
    },
    {
      id: 3,
      title: "Breaking: Mayhem Announces Tour",
      type: "news",
      author: "Mike Brown",
      submitted: "1d ago",
    },
  ];
  return (
    <motion.div variants={item}>
      <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Pending Approval</CardTitle>
            <CardDescription>Content waiting for review</CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pendingContent.length} pending
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingContent.map((content) => (
              <div
                key={content.id}
                className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{content.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {content.type}
                    </Badge>
                    <span>by {content.author}</span>
                    <span>•</span>
                    <span>{content.submitted}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Pending
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
