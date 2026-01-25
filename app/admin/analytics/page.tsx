"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Eye,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Download,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react";
import { useState } from "react";

// Mock analytics data
const pageViewsData = [
  { date: "Jan 1", views: 4000, uniqueVisitors: 2400 },
  { date: "Jan 2", views: 3000, uniqueVisitors: 1398 },
  { date: "Jan 3", views: 2000, uniqueVisitors: 9800 },
  { date: "Jan 4", views: 2780, uniqueVisitors: 3908 },
  { date: "Jan 5", views: 1890, uniqueVisitors: 4800 },
  { date: "Jan 6", views: 2390, uniqueVisitors: 3800 },
  { date: "Jan 7", views: 3490, uniqueVisitors: 4300 },
  { date: "Jan 8", views: 4000, uniqueVisitors: 2400 },
  { date: "Jan 9", views: 3000, uniqueVisitors: 1398 },
  { date: "Jan 10", views: 2000, uniqueVisitors: 9800 },
  { date: "Jan 11", views: 2780, uniqueVisitors: 3908 },
  { date: "Jan 12", views: 1890, uniqueVisitors: 4800 },
  { date: "Jan 13", views: 2390, uniqueVisitors: 3800 },
  { date: "Jan 14", views: 3490, uniqueVisitors: 4300 },
];

const topArticles = [
  { title: "The Rise of Norwegian Black Metal", views: 12450, trend: "+23%" },
  { title: "Interview: Fenriz on Darkthrone's Legacy", views: 8920, trend: "+15%" },
  { title: "Album Review: Immortal", views: 6340, trend: "+8%" },
  { title: "Death Metal Drumming Techniques", views: 5210, trend: "+12%" },
  { title: "Mayhem Announces World Tour", views: 4890, trend: "+45%" },
];

const trafficSources = [
  { source: "Organic Search", percentage: 45, color: "hsl(var(--primary))" },
  { source: "Direct", percentage: 25, color: "hsl(var(--genre-death-metal))" },
  { source: "Social Media", percentage: 20, color: "hsl(var(--genre-thrash-metal))" },
  { source: "Referral", percentage: 10, color: "hsl(var(--genre-doom-metal))" },
];

const deviceData = [
  { device: "Desktop", icon: Monitor, percentage: 55, users: "45.2K" },
  { device: "Mobile", icon: Smartphone, percentage: 38, users: "31.1K" },
  { device: "Tablet", icon: Monitor, percentage: 7, users: "5.7K" },
];

const countryData = [
  { country: "United States", flag: "🇺🇸", visitors: "28.5K", percentage: 35 },
  { country: "Germany", flag: "🇩🇪", visitors: "18.2K", percentage: 22 },
  { country: "Norway", flag: "🇳🇴", visitors: "12.8K", percentage: 15 },
  { country: "Sweden", flag: "🇸🇪", visitors: "9.4K", percentage: 11 },
  { country: "United Kingdom", flag: "🇬🇧", visitors: "7.2K", percentage: 9 },
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wide">Analytics</h1>
          <p className="text-muted-foreground">Website traffic and engagement metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-130px">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Page Views", value: "89.4K", change: "+12%", icon: Eye },
          { label: "Unique Visitors", value: "32.1K", change: "+8%", icon: Users },
          { label: "Avg. Session", value: "4m 32s", change: "+15%", icon: Clock },
          { label: "Bounce Rate", value: "42.3%", change: "-5%", icon: TrendingUp },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        stat.change.startsWith("+") ? "text-green-500" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main chart */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Traffic Overview</CardTitle>
          <CardDescription>Page views and unique visitors over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-350px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pageViewsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--genre-death-metal))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--genre-death-metal))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="uniqueVisitors"
                  stroke="hsl(var(--genre-death-metal))"
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top articles */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Top Articles</CardTitle>
            <CardDescription>Most viewed content this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{article.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {article.views.toLocaleString()} views
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-green-500">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {article.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic sources */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm text-muted-foreground">{source.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: source.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Devices</CardTitle>
            <CardDescription>User device breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {deviceData.map((device) => (
                <div key={device.device} className="text-center p-4 rounded-lg bg-muted/50">
                  <device.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">{device.percentage}%</p>
                  <p className="text-xs text-muted-foreground">{device.device}</p>
                  <p className="text-xs text-primary mt-1">{device.users}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Countries */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Top Countries
            </CardTitle>
            <CardDescription>Geographic distribution of visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {countryData.map((country) => (
                <div key={country.country} className="flex items-center gap-3">
                  <span className="text-xl">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{country.country}</span>
                      <span className="text-sm text-muted-foreground">{country.visitors}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
export default AnalyticsDashboard;