"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, Newspaper, Loader2 } from "lucide-react";
import { GenreBar } from "@/components/client/GenreBar";
import { ArticleCard } from "@/components/client/ArticleCard";
import { AdBanner } from "@/components/client/AdBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockArticles, genres, Genre } from "@/lib/data";
import { usePagination } from "@/hooks/use-pagination";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "all">("all");
  const [sortBy, setSortBy] = useState<"latest" | "trending">("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const newsArticles = mockArticles.filter((a) => a.type === "news");

  const filteredArticles = useMemo(() => {
    let articles = [...newsArticles];

    // Filter by search
    if (searchQuery) {
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.band?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      articles = articles.filter((a) => a.genre === selectedGenre);
    }

    // Sort
    if (sortBy === "latest") {
      articles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return articles;
  }, [newsArticles, searchQuery, selectedGenre, sortBy]);

  const {
    paginatedItems,
    hasMore,
    loadMore,
    resetPagination,
    displayedCount,
    totalCount,
  } = usePagination({ items: filteredArticles, itemsPerPage: 9 });

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchQuery, selectedGenre, sortBy, resetPagination]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    // Simulate loading delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    loadMore();
    setIsLoadingMore(false);
  };
  return (
    <>
      <GenreBar />

      {/* Page Header */}
      <div className="bg-linear-to-b from-card to-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl tracking-wider">
              LATEST <span className="text-primary">NEWS</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Stay up to date with the latest happenings in rock, metal, punk,
            hardcore, and alternative music from around the world.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Genre Filter */}
            <Select
              value={selectedGenre}
              onValueChange={(v) => setSelectedGenre(v as Genre | "all")}
            >
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={sortBy}
              onValueChange={(v) => setSortBy(v as "latest" | "trending")}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-border rounded-sm p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Ad */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <AdBanner position="top" />
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Active Filters */}
        {(searchQuery || selectedGenre !== "all") && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {searchQuery && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSearchQuery("")}
              >
                Search: `{"${searchQuery}"}` ×
              </Badge>
            )}
            {selectedGenre !== "all" && (
              <Badge
                variant={selectedGenre}
                className="cursor-pointer"
                onClick={() => setSelectedGenre("all")}
              >
                {genres.find((g) => g.id === selectedGenre)?.name} ×
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {displayedCount} of {totalCount} article
          {totalCount !== 1 ? "s" : ""}
        </p>

        {/* Articles */}
        {paginatedItems.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {paginatedItems.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 9) * 0.05 }}
              >
                <ArticleCard
                  article={article}
                  variant={viewMode === "list" ? "horizontal" : "default"}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                `Load More (${totalCount - displayedCount} remaining)`
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <AdBanner position="footer" />
      </div>
    </>
  );
}
