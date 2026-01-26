"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Disc3, Star, Loader2 } from "lucide-react";
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

const releaseTypes = ["All Types", "Album", "EP", "Single"];
const ratingFilters = [
  "All Ratings",
  "9-10 (Essential)",
  "7-8 (Great)",
  "5-6 (Good)",
  "Below 5",
];

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "all">("all");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const reviews = mockArticles.filter((a) => a.type === "review");

  const filteredReviews = useMemo(() => {
    let articles = [...reviews];

    if (searchQuery) {
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.band?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.label?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedGenre !== "all") {
      articles = articles.filter((a) => a.genre === selectedGenre);
    }

    if (selectedRating !== "All Ratings") {
      articles = articles.filter((a) => {
        if (!a.rating) return false;
        if (selectedRating === "9-10 (Essential)") return a.rating >= 9;
        if (selectedRating === "7-8 (Great)")
          return a.rating >= 7 && a.rating < 9;
        if (selectedRating === "5-6 (Good)")
          return a.rating >= 5 && a.rating < 7;
        if (selectedRating === "Below 5") return a.rating < 5;
        return true;
      });
    }

    return articles.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [reviews, searchQuery, selectedGenre, selectedType, selectedRating]);

  const {
    paginatedItems,
    hasMore,
    loadMore,
    resetPagination,
    displayedCount,
    totalCount,
  } = usePagination({ items: filteredReviews, itemsPerPage: 9 });

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [
    searchQuery,
    selectedGenre,
    selectedType,
    selectedRating,
    resetPagination,
  ]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    loadMore();
    setIsLoadingMore(false);
  };

  const avgRating =
    reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length;

  return (
    <>
      <GenreBar />

      {/* Page Header */}
      <div className="bg-linear-to-b from-card to-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Disc3 className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl tracking-wider">
              ALBUM <span className="text-primary">REVIEWS</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Honest, in-depth reviews of the latest releases from rock, metal,
            punk, hardcore, and alternative artists.
          </p>
          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display text-primary">
                {reviews.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Total Reviews
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-2xl font-display text-primary">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedGenre}
              onValueChange={(v) => setSelectedGenre(v as Genre | "all")}
            >
              <SelectTrigger className="w-full md:w-44">
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

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {releaseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full md:w-44">
                <Star className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ratingFilters.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Top Ad */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <AdBanner position="top" />
      </div>

      {/* Reviews Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {(searchQuery ||
          selectedGenre !== "all" ||
          selectedRating !== "All Ratings") && (
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
            {selectedRating !== "All Ratings" && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedRating("All Ratings")}
              >
                {selectedRating} ×
              </Badge>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-6">
          Showing {displayedCount} of {totalCount} review
          {totalCount !== 1 ? "s" : ""}
        </p>

        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 9) * 0.05 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No reviews found.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("all");
                setSelectedRating("All Ratings");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

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

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <AdBanner position="footer" />
      </div>
    </>
  );
}
