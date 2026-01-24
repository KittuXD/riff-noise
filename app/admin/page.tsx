"use client";

import { motion } from "framer-motion";
import { StatsGrid } from "@/components/admin/overview/StatsGrid";
import { ChartsRow } from "@/components/admin/overview/ChartsRow";
import { Engagement } from "@/components/admin/overview/Engagement";
import { PendingContent } from "@/components/admin/overview/PendingContent";
import { RecentComments } from "@/components/admin/overview/RecentComments";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DashboardOverview() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-display tracking-wide">Dashboard</h1>
        <p className="text-muted-foreground">Overview of contents and analytics</p>
      </div>

      <StatsGrid /> 
      <ChartsRow/>
      <Engagement />

      {/* Bottom section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PendingContent />
        <RecentComments />
      </div>
    </motion.div>
  );
}
