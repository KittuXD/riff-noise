"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Users,
  Eye,
  FileText,
} from "lucide-react";

export function StatsGrid() {
    
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const stats = [
    {
      name: "Total Articles",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: FileText,
    },
    {
      name: "Total Views",
      value: "89.4K",
      change: "+23%",
      trend: "up",
      icon: Eye,
    },
    {
      name: "Comments",
      value: "3,456",
      change: "-5%",
      trend: "down",
      icon: MessageSquare,
    },
    {
      name: "Subscribers",
      value: "12.8K",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
  ];
  return (
    <motion.div
      variants={item}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
              <Badge
                variant={stat.trend === "up" ? "default" : "destructive"}
                className="text-xs"
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
