"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Megaphone,
  Users,
  Building2,
  CalendarDays,
  Loader2,
  Warehouse,
} from "lucide-react";

import { GenreBar } from "@/components/client/GenreBar";
import { AdBanner } from "@/components/client/AdBanner";
import {
  BandCard,
  LabelCard,
  EventCard,
  JammingHallCard,
} from "@/components/client/PromotionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  genres,
  Genre,
  mockPromotedBands,
  mockPromotedLabels,
  mockPromotedEvents,
  mockPromotedJammingHalls,
  PromotedBand,
  PromotedLabel,
  PromotedEvent,
  PromotedJammingHall,
  countries,
  countryPlaces,
} from "@/lib/data";
import { usePagination } from "@/hooks/use-pagination";

type ContentType = "all" | "bands" | "labels" | "events" | "jamming-halls";
type PromotionItem =
  | { type: "band"; data: PromotedBand }
  | { type: "label"; data: PromotedLabel }
  | { type: "event"; data: PromotedEvent }
  | { type: "jamming-hall"; data: PromotedJammingHall };

export default function PromotionsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState<ContentType>("all");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "all">("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get available places based on selected country
  const availablePlaces =
    selectedCountry !== "all" ? countryPlaces[selectedCountry] || [] : [];

  // Combine all items into a unified list
  const allItems = useMemo((): PromotionItem[] => {
    const bands: PromotionItem[] = mockPromotedBands.map((b) => ({
      type: "band",
      data: b,
    }));
    const labels: PromotionItem[] = mockPromotedLabels.map((l) => ({
      type: "label",
      data: l,
    }));
    const events: PromotionItem[] = mockPromotedEvents.map((e) => ({
      type: "event",
      data: e,
    }));
    const jammingHalls: PromotionItem[] = mockPromotedJammingHalls.map((h) => ({
      type: "jamming-hall",
      data: h,
    }));

    return [...bands, ...labels, ...events, ...jammingHalls];
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = [...allItems];

    // Filter by content type
    if (contentType !== "all") {
      if (contentType === "bands")
        items = items.filter((i) => i.type === "band");
      if (contentType === "labels")
        items = items.filter((i) => i.type === "label");
      if (contentType === "events")
        items = items.filter((i) => i.type === "event");
      if (contentType === "jamming-halls")
        items = items.filter((i) => i.type === "jamming-hall");
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter((item) => {
        if (item.type === "band") {
          return (
            item.data.name.toLowerCase().includes(query) ||
            item.data.bio.toLowerCase().includes(query) ||
            item.data.city.toLowerCase().includes(query)
          );
        }
        if (item.type === "label") {
          return (
            item.data.name.toLowerCase().includes(query) ||
            item.data.description.toLowerCase().includes(query)
          );
        }
        if (item.type === "event") {
          return (
            item.data.name.toLowerCase().includes(query) ||
            item.data.description.toLowerCase().includes(query) ||
            item.data.city.toLowerCase().includes(query) ||
            item.data.venue.toLowerCase().includes(query)
          );
        }
        if (item.type === "jamming-hall") {
          return (
            item.data.name.toLowerCase().includes(query) ||
            item.data.description.toLowerCase().includes(query) ||
            item.data.city.toLowerCase().includes(query)
          );
        }
        return false;
      });
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      items = items.filter((item) => {
        if (item.type === "band") return item.data.genre === selectedGenre;
        if (item.type === "label")
          return item.data.genres.includes(selectedGenre);
        if (item.type === "event")
          return item.data.genres.includes(selectedGenre);
        if (item.type === "jamming-hall")
          return item.data.genres.includes(selectedGenre);
        return false;
      });
    }

    // Filter by country
    if (selectedCountry !== "all") {
      items = items.filter((item) => {
        if (item.type === "band") return item.data.country === selectedCountry;
        if (item.type === "label") return item.data.country === selectedCountry;
        if (item.type === "event") return item.data.country === selectedCountry;
        if (item.type === "jamming-hall")
          return item.data.country === selectedCountry;
        return false;
      });
    }

    // Filter by place (city)
    if (selectedPlace !== "all") {
      items = items.filter((item) => {
        if (item.type === "band") return item.data.city === selectedPlace;
        if (item.type === "label") return true; // Labels don't have city
        if (item.type === "event") return item.data.city === selectedPlace;
        if (item.type === "jamming-hall")
          return item.data.city === selectedPlace;
        return false;
      });
    }

    // Filter by date (events only)
    if (selectedDate && contentType === "events") {
      items = items.filter((item) => {
        if (item.type === "event") {
          return item.data.date >= selectedDate;
        }
        return true;
      });
    }

    // Sort: featured items first
    items.sort((a, b) => {
      const aFeatured = "featured" in a.data && a.data.featured ? 1 : 0;
      const bFeatured = "featured" in b.data && b.data.featured ? 1 : 0;
      return bFeatured - aFeatured;
    });

    return items;
  }, [
    allItems,
    contentType,
    searchQuery,
    selectedGenre,
    selectedCountry,
    selectedPlace,
    selectedDate,
  ]);

  const {
    paginatedItems,
    hasMore,
    loadMore,
    resetPagination,
    displayedCount,
    totalCount,
  } = usePagination({ items: filteredItems, itemsPerPage: 12 });

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [
    searchQuery,
    contentType,
    selectedGenre,
    selectedCountry,
    selectedPlace,
    selectedDate,
    resetPagination,
  ]);

  // Reset place when country changes
  useEffect(() => {
    setSelectedPlace("all");
  }, [selectedCountry]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    loadMore();
    setIsLoadingMore(false);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setContentType("all");
    setSelectedGenre("all");
    setSelectedCountry("all");
    setSelectedPlace("all");
    setSelectedDate("");
  };

  const hasActiveFilters =
    searchQuery ||
    contentType !== "all" ||
    selectedGenre !== "all" ||
    selectedCountry !== "all" ||
    selectedPlace !== "all" ||
    selectedDate;

  const stats = {
    bands: mockPromotedBands.length,
    labels: mockPromotedLabels.length,
    events: mockPromotedEvents.length,
    jammingHalls: mockPromotedJammingHalls.length,
    total:
      mockPromotedBands.length +
      mockPromotedLabels.length +
      mockPromotedEvents.length +
      mockPromotedJammingHalls.length,
  };

  return (
    <>
      <GenreBar />
      {/* Page Header */}
      <header className="bg-linear-to-b from-card to-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Megaphone className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl tracking-wider">
              PROMOTIONS <span className="text-primary">DIRECTORY</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Discover featured bands, labels, events, and jamming halls from the
            rock, metal, punk, hardcore, and alternative scenes.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-display text-primary">
                {stats.bands}
              </span>
              <span className="text-sm text-muted-foreground">Bands</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-2xl font-display text-primary">
                {stats.labels}
              </span>
              <span className="text-sm text-muted-foreground">Labels</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              <span className="text-2xl font-display text-primary">
                {stats.events}
              </span>
              <span className="text-sm text-muted-foreground">Events</span>
            </div>
            <div className="flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-primary" />
              <span className="text-2xl font-display text-primary">
                {stats.jammingHalls}
              </span>
              <span className="text-sm text-muted-foreground">
                Jamming Halls
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 lg:top-20 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          {/* Content Type Tabs */}
          <div className="mb-4">
            <Tabs
              value={contentType}
              onValueChange={(v) => setContentType(v as ContentType)}
            >
              <TabsList className="w-full md:w-auto grid grid-cols-5 md:flex">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <span className="hidden sm:inline">All</span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {stats.total}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="bands" className="flex items-center gap-2">
                  <Users className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Bands</span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {stats.bands}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="labels" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Labels</span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {stats.labels}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Events</span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {stats.events}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="jamming-halls"
                  className="flex items-center gap-2"
                >
                  <Warehouse className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Jamming Halls</span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {stats.jammingHalls}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or keyword..."
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
              <SelectTrigger className="w-full md:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Genre" />
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

            {/* Country Filter */}
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full md:w-36">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Place Filter (shows when country is selected) */}
            <AnimatePresence>
              {selectedCountry !== "all" && availablePlaces.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <Select
                    value={selectedPlace}
                    onValueChange={setSelectedPlace}
                  >
                    <SelectTrigger className="w-full md:w-36">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {availablePlaces.map((place) => (
                        <SelectItem key={place} value={place}>
                          {place}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date Filter (Events Only) */}
            <AnimatePresence>
              {contentType === "events" && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full md:w-40"
                    placeholder="From date"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Top Ad */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <AdBanner position="top" />
      </div>

      {/* Results Section */}
      <section className="container mx-auto px-4 lg:px-8 py-8">
        {/* Active Filters */}
        {hasActiveFilters && (
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
            {contentType !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer capitalize"
                onClick={() => setContentType("all")}
              >
                {contentType} ×
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
            {selectedCountry !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedCountry("all")}
              >
                {selectedCountry} ×
              </Badge>
            )}
            {selectedPlace !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedPlace("all")}
              >
                {selectedPlace} ×
              </Badge>
            )}
            {selectedDate && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedDate("")}
              >
                From: {selectedDate} ×
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {displayedCount} of {totalCount} result
          {totalCount !== 1 ? "s" : ""}
        </p>

        {/* Results Grid */}
        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedItems.map((item, i) => (
              <motion.article
                key={`${item.type}-${item.data.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 12) * 0.03 }}
              >
                {item.type === "band" && <BandCard band={item.data} />}
                {item.type === "label" && <LabelCard label={item.data} />}
                {item.type === "event" && <EventCard event={item.data} />}
                {item.type === "jamming-hall" && (
                  <JammingHallCard hall={item.data} />
                )}
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Megaphone className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg mb-2">
              No results found.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or search query.
            </p>
            <Button variant="outline" onClick={clearFilters}>
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
      </section>

      {/* Footer Ad */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <AdBanner position="footer" />
      </div>
    </>
  );
}
