"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Cell is being deprecated in future versions of recharts but is still needed for custom pie slice colors as of now
// Shape will be the alternative in future versions
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export function ChartsRow() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const viewsData = [
    { name: "Mon", views: 2400 },
    { name: "Tue", views: 1398 },
    { name: "Wed", views: 9800 },
    { name: "Thu", views: 3908 },
    { name: "Fri", views: 4800 },
    { name: "Sat", views: 3800 },
    { name: "Sun", views: 4300 },
  ];

  const contentByGenre = [
    { name: "Black Metal", value: 35, color: "hsl(var(--genre-black-metal))" },
    { name: "Death Metal", value: 28, color: "hsl(var(--genre-death-metal))" },
    { name: "Thrash Metal", value: 22, color: "hsl(var(--genre-thrash-metal))" },
    { name: "Doom Metal", value: 15, color: "hsl(var(--genre-doom-metal))" },
  ];
  
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Views chart */}
      <motion.div variants={item}>
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Views</CardTitle>
            <CardDescription>Page views over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="text-xs">
            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="views"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content by genre */}
      <motion.div variants={item}>
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Content by Genre</CardTitle>
            <CardDescription>Distribution of articles by genre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-75 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentByGenre}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {contentByGenre.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 ml-4">
                {contentByGenre.map((genre) => (
                  <div key={genre.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: genre.color }}
                    />
                    <span className="text-sm">{genre.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {genre.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
