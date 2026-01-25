"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  FileText,
  Send,
  Archive,
  Copy,
} from "lucide-react";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { toast } from "sonner";
import Image from "next/image";


type ViewMode = "list" | "create" | "edit";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: string;
  author: string;
  views: number;
  featured: boolean;
  createdAt: string;
  content?: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
}

// Initial mock content data
const initialMockContent: ContentItem[] = [
  {
    id: "1",
    title: "The Rise of Norwegian Black Metal",
    type: "news",
    status: "published",
    author: "Erik Bloodaxe",
    views: 12450,
    featured: true,
    createdAt: "2024-01-15",
    content:
      "<p>Norwegian black metal is a subgenre of heavy metal music that originated in Norway in the early 1990s...</p>",
    excerpt:
      "An exploration of the origins and evolution of Norwegian black metal.",
    tags: ["black metal", "norway", "history"],
  },
  {
    id: "2",
    title: "Interview: Fenriz on Darkthrone's Legacy",
    type: "interview",
    status: "published",
    author: "Lars Darkness",
    views: 8920,
    featured: false,
    createdAt: "2024-01-14",
    content:
      "<p>We sat down with Fenriz to discuss the legacy of Darkthrone...</p>",
    excerpt: "Fenriz shares his thoughts on decades of making music.",
    tags: ["darkthrone", "interview", "fenriz"],
  },
  {
    id: "3",
    title: "Album Review: Immortal - Northern Chaos Gods",
    type: "review",
    status: "pending",
    author: "Grimwald",
    views: 0,
    featured: false,
    createdAt: "2024-01-13",
    content: "<p>Immortal returns with their latest offering...</p>",
    excerpt: "A deep dive into Immortal's triumphant return.",
    tags: ["immortal", "review", "album"],
  },
  {
    id: "4",
    title: "Death Metal Drumming Techniques",
    type: "news",
    status: "draft",
    author: "Mike Thunder",
    views: 0,
    featured: false,
    createdAt: "2024-01-12",
    content:
      "<p>Learn the essential drumming techniques used in death metal...</p>",
    excerpt: "Master the blast beats and double bass techniques.",
    tags: ["drums", "tutorial", "death metal"],
  },
  {
    id: "5",
    title: "Review: Morbid Angel - Kingdoms Disdained",
    type: "review",
    status: "published",
    author: "Sarah Doom",
    views: 6340,
    featured: true,
    createdAt: "2024-01-11",
    content: "<p>Morbid Angel delivers another crushing album...</p>",
    excerpt: "The legendary band's latest offering analyzed.",
    tags: ["morbid angel", "review", "death metal"],
  },
];

const statusColors: Record<string, string> = {
  published: "bg-green-500/20 text-green-500",
  pending: "bg-yellow-500/20 text-yellow-500",
  draft: "bg-muted text-muted-foreground",
  rejected: "bg-destructive/20 text-destructive",
  archived: "bg-blue-500/20 text-blue-500",
};

const statusIcons: Record<string, React.ReactNode> = {
  published: <CheckCircle className="w-3 h-3" />,
  pending: <Clock className="w-3 h-3" />,
  draft: <Edit className="w-3 h-3" />,
  rejected: <XCircle className="w-3 h-3" />,
  archived: <Archive className="w-3 h-3" />,
};

export default function ContentManagement() {
  const [content, setContent] = useState<ContentItem[]>(initialMockContent);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingArticle, setEditingArticle] = useState<ContentItem | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ContentItem | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || item.status === activeTab;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesTab && matchesType;
  });

  const handleCreateNew = () => {
    setEditingArticle(null);
    setViewMode("create");
  };

  const handleEdit = (item: ContentItem) => {
    setEditingArticle(item);
    setViewMode("edit");
  };

  const handleBack = () => {
    setViewMode("list");
    setEditingArticle(null);
  };

  const handleSave = (articleData: {
    title: string;
    content: string;
    excerpt: string;
    type: string;
    status: string;
    featured: boolean;
    featuredImage: string;
    tags: string[];
  }) => {
    if (editingArticle) {
      // Update existing article
      setContent((prev) =>
        prev.map((item) =>
          item.id === editingArticle.id ? { ...item, ...articleData } : item,
        ),
      );
      toast.success("Article updated successfully!");
    } else {
      // Create new article
      const newArticle: ContentItem = {
        id: Date.now().toString(),
        ...articleData,
        author: "Current User",
        views: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setContent((prev) => [newArticle, ...prev]);
      toast.success("Article created successfully!");
    }
    handleBack();
  };

  const handleDelete = (item: ContentItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setContent((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      toast.success(`"${itemToDelete.title}" has been deleted`);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleToggleFeatured = (item: ContentItem) => {
    setContent((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, featured: !i.featured } : i)),
    );
    toast.success(item.featured ? "Article unfeatured" : "Article featured");
  };

  const handleStatusChange = (item: ContentItem, newStatus: string) => {
    setContent((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: newStatus } : i)),
    );
    toast.success(`Status changed to ${newStatus}`);
  };

  const handleDuplicate = (item: ContentItem) => {
    const duplicated: ContentItem = {
      ...item,
      id: Date.now().toString(),
      title: `${item.title} (Copy)`,
      status: "draft",
      views: 0,
      featured: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setContent((prev) => [duplicated, ...prev]);
    toast.success("Article duplicated as draft");
  };

  const handlePreview = (item: ContentItem) => {
    setPreviewItem(item);
    setPreviewDialogOpen(true);
  };

  // Show editor view
  if (viewMode === "create" || viewMode === "edit") {
    return (
      <ArticleEditor
        article={
          editingArticle
            ? {
                id: editingArticle.id,
                title: editingArticle.title,
                content: editingArticle.content || "",
                excerpt: editingArticle.excerpt || "",
                type: editingArticle.type,
                status: editingArticle.status,
                featured: editingArticle.featured,
                featuredImage: editingArticle.featuredImage,
                tags: editingArticle.tags || [],
              }
            : undefined
        }
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  const stats = {
    total: content.length,
    published: content.filter((c) => c.status === "published").length,
    pending: content.filter((c) => c.status === "pending").length,
    drafts: content.filter((c) => c.status === "draft").length,
  };

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
          <h1 className="text-2xl font-display tracking-wide">Content</h1>
          <p className="text-muted-foreground">
            Manage articles, reviews, and interviews
          </p>
        </div>
        <Button className="gap-2" onClick={handleCreateNew}>
          <Plus className="w-4 h-4" />
          New Article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Articles",
            value: stats.total,
            icon: FileText,
            color: "text-primary",
          },
          {
            label: "Published",
            value: stats.published,
            icon: CheckCircle,
            color: "text-green-500",
          },
          {
            label: "Pending Review",
            value: stats.pending,
            icon: Clock,
            color: "text-yellow-500",
          },
          {
            label: "Drafts",
            value: stats.drafts,
            icon: Edit,
            color: "text-muted-foreground",
          },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-card/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {typeFilter === "all"
                    ? "All Types"
                    : typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTypeFilter("news")}>
                  News
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("review")}>
                  Reviews
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("interview")}>
                  Interviews
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Content tabs and table */}
      <Card className="bg-card/50">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-0">
            <TabsList className="grid w-full grid-cols-5 max-w-lg">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="pt-6">
            <TabsContent value={activeTab} className="m-0">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[40%]">Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="w-12.5"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((item) => (
                      <TableRow key={item.id} className="group">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate max-w-md">
                            {item.excerpt}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`gap-1 ${statusColors[item.status]}`}
                          >
                            {statusIcons[item.status]}
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell className="text-right">
                          {item.views.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handlePreview(item)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(item)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDuplicate(item)}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleFeatured(item)}
                              >
                                <Star className="w-4 h-4 mr-2" />
                                {item.featured ? "Unfeature" : "Feature"}
                              </DropdownMenuItem>
                              {item.status === "draft" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(item, "pending")
                                  }
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Submit for Review
                                </DropdownMenuItem>
                              )}
                              {item.status === "pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(item, "published")
                                  }
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Publish
                                </DropdownMenuItem>
                              )}
                              {item.status === "published" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(item, "archived")
                                  }
                                >
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(item)}
                              >
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

              {filteredContent.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No content found</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleCreateNew}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Article
                  </Button>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete  `{"${itemToDelete?.title}"}`? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{previewItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {previewItem?.author}</span>
              <span>•</span>
              <span>{previewItem?.createdAt}</span>
              <span>•</span>
              <Badge variant="outline" className="capitalize">
                {previewItem?.type}
              </Badge>
              <Badge
                className={`${statusColors[previewItem?.status || "draft"]}`}
              >
                {previewItem?.status}
              </Badge>
            </div>
            {previewItem?.featuredImage && (
              <Image
                src={previewItem.featuredImage}
                alt={previewItem.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <p className="text-lg text-muted-foreground italic">
              {previewItem?.excerpt}
            </p>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: previewItem?.content || "" }}
            />
            {previewItem?.tags && previewItem.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap pt-4 border-t border-border">
                {previewItem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
