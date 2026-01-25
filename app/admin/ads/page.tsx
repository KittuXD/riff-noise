"use client"
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  Pause,
  Play,
} from "lucide-react";

// Mock ads data
const mockAds = [
  {
    id: "1",
    name: "Nuclear Blast Records Banner",
    type: "banner",
    placement: "header",
    status: "active",
    impressions: 45678,
    clicks: 1234,
    ctr: 2.7,
    revenue: 456.78,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  },
  {
    id: "2",
    name: "Metal Blade Sidebar",
    type: "sidebar",
    placement: "sidebar",
    status: "active",
    impressions: 32456,
    clicks: 876,
    ctr: 2.7,
    revenue: 234.56,
    startDate: "2024-01-15",
    endDate: "2024-02-28",
  },
  {
    id: "3",
    name: "Festival Promo",
    type: "popup",
    placement: "modal",
    status: "paused",
    impressions: 12345,
    clicks: 234,
    ctr: 1.9,
    revenue: 89.12,
    startDate: "2024-02-01",
    endDate: "2024-02-15",
  },
  {
    id: "4",
    name: "Merchandise Store",
    type: "banner",
    placement: "footer",
    status: "scheduled",
    impressions: 0,
    clicks: 0,
    ctr: 0,
    revenue: 0,
    startDate: "2024-02-01",
    endDate: "2024-04-30",
  },
];

const mockSponsors = [
  { id: "1", name: "Nuclear Blast Records", type: "Label", activeAds: 3, totalSpend: 2345.67 },
  { id: "2", name: "Metal Blade Records", type: "Label", activeAds: 2, totalSpend: 1234.56 },
  { id: "3", name: "Bloodstock Festival", type: "Event", activeAds: 1, totalSpend: 567.89 },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-500",
  paused: "bg-yellow-500/20 text-yellow-500",
  scheduled: "bg-blue-500/20 text-blue-500",
  ended: "bg-muted text-muted-foreground",
};

export function AdsManagement() {
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
          <h1 className="text-2xl font-display tracking-wide">Ads & Sponsorships</h1>
          <p className="text-muted-foreground">Manage advertising campaigns and sponsors</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Revenue", value: "$3,456", change: "+23%", icon: DollarSign },
          { label: "Impressions", value: "90.5K", change: "+12%", icon: Eye },
          { label: "Clicks", value: "2,344", change: "+8%", icon: MousePointerClick },
          { label: "Avg. CTR", value: "2.6%", change: "+0.3%", icon: TrendingUp },
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
                    <Badge variant="secondary" className="text-xs text-green-500">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active campaigns */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Campaign</TableHead>
                  <TableHead>Placement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="w-50px"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAds.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ad.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {ad.startDate} - {ad.endDate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {ad.placement}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`capitalize ${statusColors[ad.status]}`}>
                        {ad.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {ad.impressions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{ad.ctr}%</TableCell>
                    <TableCell className="text-right font-medium">
                      ${ad.revenue.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Stats
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {ad.status === "active" ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Resume
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Sponsors */}
      <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Sponsors</CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Sponsor
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockSponsors.map((sponsor) => (
              <Card key={sponsor.id} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{sponsor.name}</h3>
                    <Badge variant="outline">{sponsor.type}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Ads</span>
                      <span>{sponsor.activeAds}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Spend</span>
                      <span className="font-medium">${sponsor.totalSpend.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
export default AdsManagement;