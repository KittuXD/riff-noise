"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Plus, MoreHorizontal, Edit, Trash2, Tag, Hash, Folder } from "lucide-react";

// Mock data
const mockGenres = [
  { id: "1", name: "Black Metal", slug: "black-metal", color: "#1a1a2e", articleCount: 156 },
  { id: "2", name: "Death Metal", slug: "death-metal", color: "#8B0000", articleCount: 142 },
  { id: "3", name: "Thrash Metal", slug: "thrash-metal", color: "#FF4500", articleCount: 98 },
  { id: "4", name: "Doom Metal", slug: "doom-metal", color: "#2F4F4F", articleCount: 67 },
  { id: "5", name: "Power Metal", slug: "power-metal", color: "#DAA520", articleCount: 45 },
];

const mockTags = [
  { id: "1", name: "Album Review", slug: "album-review", usageCount: 234 },
  { id: "2", name: "Interview", slug: "interview", usageCount: 89 },
  { id: "3", name: "Tour News", slug: "tour-news", usageCount: 156 },
  { id: "4", name: "New Release", slug: "new-release", usageCount: 178 },
  { id: "5", name: "Festival", slug: "festival", usageCount: 67 },
];

const mockCategories = [
  { id: "1", name: "News", slug: "news", description: "Latest metal news and updates", articleCount: 445 },
  { id: "2", name: "Reviews", slug: "reviews", description: "Album and concert reviews", articleCount: 312 },
  { id: "3", name: "Interviews", slug: "interviews", description: "Exclusive band interviews", articleCount: 89 },
  { id: "4", name: "Features", slug: "features", description: "In-depth features and analysis", articleCount: 56 },
];

export default function CategoryManagement() {
  const [activeSection, setActiveSection] = useState<"genres" | "tags" | "categories">("genres");

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
          <h1 className="text-2xl font-display tracking-wide">Categories</h1>
          <p className="text-muted-foreground">Manage genres, tags, and content categories</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2">
        {[
          { key: "genres", label: "Genres", icon: Tag },
          { key: "tags", label: "Tags", icon: Hash },
          { key: "categories", label: "Categories", icon: Folder },
        ].map((section) => (
          <Button
            key={section.key}
            variant={activeSection === section.key ? "default" : "outline"}
            onClick={() => setActiveSection(section.key as typeof activeSection)}
            className="gap-2"
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </Button>
        ))}
      </div>

      {/* Genres */}
      {activeSection === "genres" && (
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Genre</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Articles</TableHead>
                    <TableHead className="w-50px"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGenres.map((genre) => (
                    <TableRow key={genre.id}>
                      <TableCell className="font-medium">{genre.name}</TableCell>
                      <TableCell className="text-muted-foreground">{genre.slug}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border border-border"
                            style={{ backgroundColor: genre.color }}
                          />
                          <span className="text-xs text-muted-foreground">{genre.color}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{genre.articleCount}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
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
      )}

      {/* Tags */}
      {activeSection === "tags" && (
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Tag</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Usage Count</TableHead>
                    <TableHead className="w-50px"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell>
                        <Badge variant="secondary">{tag.name}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{tag.slug}</TableCell>
                      <TableCell className="text-right">{tag.usageCount}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
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
      )}

      {/* Categories */}
      {activeSection === "categories" && (
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Content Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Articles</TableHead>
                    <TableHead className="w-50px"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-muted-foreground">{category.description}</TableCell>
                      <TableCell className="text-right">{category.articleCount}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
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
      )}
    </motion.div>
  );
}
