"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  CheckCircle,
  XCircle,
  Flag,
  MessageSquare,
  AlertTriangle,
  ThumbsUp,
  Clock,
  MoreHorizontal,
  Trash2,
  Reply,
  Eye,
  Ban,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  article: string;
  status: "pending" | "approved" | "rejected" | "spam";
  reported: boolean;
  reportReason?: string;
  createdAt: string;
  reply?: string;
}

// Initial mock comments data
const initialMockComments: Comment[] = [
  {
    id: "1",
    author: "MetalFan666",
    email: "metalfan666@email.com",
    content: "This is an amazing article! Really loved the deep dive into the history. The section about the early days was particularly enlightening.",
    article: "The Rise of Norwegian Black Metal",
    status: "pending",
    reported: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    author: "DarkLord",
    email: "darklord@email.com",
    content: "I disagree with this rating. The album deserves at least a 9/10. The guitar work alone is masterful.",
    article: "Album Review: Immortal - Northern Chaos Gods",
    status: "approved",
    reported: false,
    createdAt: "2024-01-15T09:15:00Z",
    reply: "Thanks for your perspective! Ratings are always subjective.",
  },
  {
    id: "3",
    author: "TrollMaster",
    email: "troll@spam.com",
    content: "This is spam content that should be removed immediately!!! Buy cheap products at...",
    article: "Interview: Fenriz on Darkthrone's Legacy",
    status: "pending",
    reported: true,
    reportReason: "Spam content",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "4",
    author: "GrimReaper",
    email: "grimreaper@email.com",
    content: "Great interview! Fenriz always has such interesting perspectives on the scene. Would love to see more content like this.",
    article: "Interview: Fenriz on Darkthrone's Legacy",
    status: "approved",
    reported: false,
    createdAt: "2024-01-14T22:45:00Z",
  },
  {
    id: "5",
    author: "ThrasherX",
    email: "thrasherx@email.com",
    content: "Can't wait for this tour! Already got my tickets. Anyone else going to the Oslo show?",
    article: "Breaking: Mayhem Announces World Tour",
    status: "pending",
    reported: false,
    createdAt: "2024-01-14T18:30:00Z",
  },
  {
    id: "6",
    author: "HateMonger",
    email: "hate@email.com",
    content: "This band sucks and so does everyone who likes them. You're all idiots.",
    article: "The Rise of Norwegian Black Metal",
    status: "pending",
    reported: true,
    reportReason: "Hateful content",
    createdAt: "2024-01-14T15:00:00Z",
  },
];

export default function CommentModeration() {
  const [comments, setComments] = useState<Comment[]>(initialMockComments);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [commentToReply, setCommentToReply] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [bulkSelection, setBulkSelection] = useState<string[]>([]);

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(search.toLowerCase()) ||
      comment.author.toLowerCase().includes(search.toLowerCase()) ||
      comment.article.toLowerCase().includes(search.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "reported") return matchesSearch && comment.reported;
    if (activeTab === "spam") return matchesSearch && comment.status === "spam";
    return matchesSearch && comment.status === activeTab;
  });

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleApprove = (comment: Comment) => {
    setComments(prev => prev.map(c => 
      c.id === comment.id ? { ...c, status: "approved" as const, reported: false } : c
    ));
    toast.success(`Comment by ${comment.author} approved`);
  };

  const handleReject = (comment: Comment) => {
    setComments(prev => prev.map(c => 
      c.id === comment.id ? { ...c, status: "rejected" as const } : c
    ));
    toast.success(`Comment by ${comment.author} rejected`);
  };

  const handleMarkAsSpam = (comment: Comment) => {
    setComments(prev => prev.map(c => 
      c.id === comment.id ? { ...c, status: "spam" as const } : c
    ));
    toast.success(`Comment marked as spam`);
  };

  const handleDelete = (comment: Comment) => {
    setCommentToDelete(comment);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (commentToDelete) {
      setComments(prev => prev.filter(c => c.id !== commentToDelete.id));
      toast.success(`Comment deleted`);
      setDeleteDialogOpen(false);
      setCommentToDelete(null);
    }
  };

  const handleOpenReply = (comment: Comment) => {
    setCommentToReply(comment);
    setReplyText(comment.reply || "");
    setReplyDialogOpen(true);
  };

  const handleSaveReply = () => {
    if (commentToReply && replyText.trim()) {
      setComments(prev => prev.map(c => 
        c.id === commentToReply.id ? { ...c, reply: replyText.trim() } : c
      ));
      toast.success("Reply saved");
      setReplyDialogOpen(false);
      setCommentToReply(null);
      setReplyText("");
    }
  };

  const handleViewDetails = (comment: Comment) => {
    setSelectedComment(comment);
    setDetailDialogOpen(true);
  };

  const handleBulkApprove = () => {
    setComments(prev => prev.map(c => 
      bulkSelection.includes(c.id) ? { ...c, status: "approved" as const, reported: false } : c
    ));
    toast.success(`${bulkSelection.length} comments approved`);
    setBulkSelection([]);
  };

  const handleBulkReject = () => {
    setComments(prev => prev.map(c => 
      bulkSelection.includes(c.id) ? { ...c, status: "rejected" as const } : c
    ));
    toast.success(`${bulkSelection.length} comments rejected`);
    setBulkSelection([]);
  };

  const toggleBulkSelect = (id: string) => {
    setBulkSelection(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const pendingCount = comments.filter((c) => c.status === "pending").length;
  const reportedCount = comments.filter((c) => c.reported).length;
  const approvedCount = comments.filter((c) => c.status === "approved").length;
  const spamCount = comments.filter((c) => c.status === "spam").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display tracking-wide">Comments</h1>
        <p className="text-muted-foreground">Moderate user comments and feedback</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Comments", value: comments.length, icon: MessageSquare, color: "text-primary" },
          { label: "Pending", value: pendingCount, icon: Clock, color: "text-yellow-500" },
          { label: "Reported", value: reportedCount, icon: Flag, color: "text-destructive" },
          { label: "Approved", value: approvedCount, icon: ThumbsUp, color: "text-green-500" },
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

      {/* Search and Bulk Actions */}
      <Card className="bg-card/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search comments, authors, or articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            {bulkSelection.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkApprove} className="gap-1">
                  <CheckCheck className="w-4 h-4" />
                  Approve ({bulkSelection.length})
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkReject} className="gap-1 text-destructive">
                  <XCircle className="w-4 h-4" />
                  Reject ({bulkSelection.length})
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setBulkSelection([])}>
                  Clear
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comments list */}
      <Card className="bg-card/50">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardContent className="pt-6 pb-0">
            <TabsList className="grid w-full grid-cols-5 max-w-lg">
              <TabsTrigger value="pending" className="gap-1">
                Pending
                {pendingCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                    {pendingCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="reported" className="gap-1">
                Reported
                {reportedCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 px-1.5">
                    {reportedCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </CardContent>

          <CardContent className="pt-6">
            <TabsContent value={activeTab} className="m-0 space-y-4">
              {filteredComments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border bg-muted/30 ${
                    bulkSelection.includes(comment.id) ? "border-primary" : "border-border"
                  } ${comment.reported ? "border-l-4 border-l-destructive" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={bulkSelection.includes(comment.id)}
                        onChange={() => toggleBulkSelect(comment.id)}
                        className="h-4 w-4 rounded border-border"
                      />
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/20 text-primary text-sm">
                          {getInitials(comment.author)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(comment.createdAt)}
                        </span>
                        {comment.reported && (
                          <Badge variant="destructive" className="gap-1 text-xs">
                            <AlertTriangle className="w-3 h-3" />
                            {comment.reportReason || "Reported"}
                          </Badge>
                        )}
                        {comment.status === "approved" && (
                          <Badge className="bg-green-500/20 text-green-500 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </Badge>
                        )}
                        {comment.status === "rejected" && (
                          <Badge className="bg-destructive/20 text-destructive text-xs">
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejected
                          </Badge>
                        )}
                        {comment.status === "spam" && (
                          <Badge className="bg-orange-500/20 text-orange-500 text-xs">
                            <Ban className="w-3 h-3 mr-1" />
                            Spam
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                      <p className="text-xs text-primary mt-2">on `{"${comment.article}"}`</p>
                      {comment.reply && (
                        <div className="mt-3 pl-4 border-l-2 border-primary/50">
                          <p className="text-xs text-muted-foreground mb-1">Your reply:</p>
                          <p className="text-sm text-muted-foreground">{comment.reply}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {comment.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                            onClick={() => handleApprove(comment)}
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleReject(comment)}
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(comment)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenReply(comment)}>
                            <Reply className="w-4 h-4 mr-2" />
                            {comment.reply ? "Edit Reply" : "Reply"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {comment.status !== "approved" && (
                            <DropdownMenuItem onClick={() => handleApprove(comment)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {comment.status !== "rejected" && (
                            <DropdownMenuItem onClick={() => handleReject(comment)}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleMarkAsSpam(comment)}>
                            <Ban className="w-4 h-4 mr-2" />
                            Mark as Spam
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(comment)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredComments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No comments found</p>
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
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment by {commentToDelete?.author}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {commentToReply?.author}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">{commentToReply?.content}</p>
            </div>
            <Textarea
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveReply} disabled={!replyText.trim()}>
              Save Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Comment Details</DialogTitle>
          </DialogHeader>
          {selectedComment && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {getInitials(selectedComment.author)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedComment.author}</p>
                  <p className="text-sm text-muted-foreground">{selectedComment.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Comment:</p>
                <p className="p-3 bg-muted rounded-lg">{selectedComment.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Article:</p>
                  <p>{selectedComment.article}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status:</p>
                  <p className="capitalize">{selectedComment.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Posted:</p>
                  <p>{new Date(selectedComment.createdAt).toLocaleString()}</p>
                </div>
                {selectedComment.reported && (
                  <div>
                    <p className="text-muted-foreground">Report Reason:</p>
                    <p className="text-destructive">{selectedComment.reportReason || "Not specified"}</p>
                  </div>
                )}
              </div>
              {selectedComment.reply && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Your Reply:</p>
                  <p className="p-3 bg-primary/10 rounded-lg border-l-2 border-primary">
                    {selectedComment.reply}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
