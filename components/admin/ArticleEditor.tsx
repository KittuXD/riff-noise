"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  X,
  ImagePlus,
} from "lucide-react";
import Image from "next/image";

interface ArticleEditorProps {
  article?: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    type: string;
    status: string;
    featured: boolean;
    featuredImage?: string;
    tags: string[];
  };
  onBack: () => void;
  onSave?: (article: ArticleData) => void;
}

interface ArticleData {
  title: string;
  content: string;
  excerpt: string;
  type: string;
  status: string;
  featured: boolean;
  featuredImage: string;
  tags: string[];
}

export function ArticleEditor({ article, onBack, onSave }: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [type, setType] = useState(article?.type || "news");
  const [status, setStatus] = useState(article?.status || "draft");
  const [featured, setFeatured] = useState(article?.featured || false);
  const [featuredImage, setFeaturedImage] = useState(article?.featuredImage || "");
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = (saveStatus: string = status) => {
    onSave?.({
      title,
      content,
      excerpt,
      type,
      status: saveStatus,
      featured,
      featuredImage,
      tags,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-display tracking-wide">
              {article ? "Edit Article" : "New Article"}
            </h1>
            <p className="text-muted-foreground">
              {article ? "Update your article content" : "Create a new article"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave("draft")}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={() => handleSave("pending")}>
            <Send className="h-4 w-4 mr-2" />
            Submit for Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card className="bg-card/50">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter article title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-medium"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Content</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Write your article content here..."
              />
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Excerpt</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Textarea
                placeholder="Write a short summary of your article..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-2">
                This will be displayed in article previews and search results.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Article</Label>
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {featuredImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setFeaturedImage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ImagePlus className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Add a featured image
                  </p>
                </div>
              )}
              <Input
                placeholder="Image URL..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
