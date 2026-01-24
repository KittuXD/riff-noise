"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Engagement() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const engagementData = [
    { name: "Week 1", comments: 120, shares: 45 },
    { name: "Week 2", comments: 180, shares: 78 },
    { name: "Week 3", comments: 95, shares: 32 },
    { name: "Week 4", comments: 220, shares: 98 },
  ];
  return (
    <motion.div variants={item}>
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Engagement Trends</CardTitle>
          <CardDescription>
            Comments and shares over the last 4 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
                <Line
                  type="monotone"
                  dataKey="shares"
                  stroke="hsl(var(--genre-death-metal))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--genre-death-metal))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
