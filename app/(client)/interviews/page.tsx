"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Mic2, Loader2 } from "lucide-react";
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

const countries = [
  "All Countries",
  "USA",
  "UK",
  "Germany",
  "Japan",
  "Australia",
  "Canada",
];

export default function InterviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "all">("all");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const interviews = mockArticles.filter((a) => a.type === "interview");

  const filteredInterviews = useMemo(() => {
    let articles = [...interviews];

    if (searchQuery) {
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.band?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedGenre !== "all") {
      articles = articles.filter((a) => a.genre === selectedGenre);
    }

    return articles;
  }, [interviews, searchQuery, selectedGenre, selectedCountry]);

  const {
    paginatedItems,
    hasMore,
    loadMore,
    resetPagination,
    displayedCount,
    totalCount,
  } = usePagination({ items: filteredInterviews, itemsPerPage: 6 });

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchQuery, selectedGenre, selectedCountry, resetPagination]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
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
            <Mic2 className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl tracking-wider">
              ARTIST <span className="text-primary">INTERVIEWS</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            In-depth conversations with the artists shaping the rock, metal, and
            alternative music scenes. Get exclusive insights into their creative
            process and journey.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search interviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

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

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
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

      {/* Interviews Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
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

        <p className="text-sm text-muted-foreground mb-6">
          Showing {displayedCount} of {totalCount} interview
          {totalCount !== 1 ? "s" : ""}
        </p>

        {paginatedItems.length > 0 ? (
          <div className="space-y-6">
            {paginatedItems.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.1 }}
              >
                <ArticleCard article={article} variant="horizontal" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No interviews found.
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
