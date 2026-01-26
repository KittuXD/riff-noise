import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUp, ArrowDown, CornerDownLeft, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import  {mockArticles}  from "@/lib/data";
import Image from "next/image";

interface SearchResult {
  id: string;
  title: string;
  type: "news" | "interview" | "review";
  genre: string;
  image: string;
}

const allContent: SearchResult[] = mockArticles.map((a) => ({
  id: a.id,
  title: a.title,
  type: a.type,
  genre: a.genre,
  image: a.image,
}));

const recentSearches = ["Black Metal", "Album Reviews", "Tour Announcements", "Interviews"];
const trendingSearches = ["Death Metal", "New Releases", "Festival News", "Underground Bands"];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  // Filter results based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.genre.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(filtered.slice(0, 8));
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            const result = results[selectedIndex];
            navigate.push(`/${result.type}/${result.id}`);
            onClose();
            setQuery("");
          }
          break;
      }
    },
    [isOpen, results, selectedIndex, navigate, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, results.length]);

  const handleResultClick = (result: SearchResult) => {
    navigate.push(`/${result.type}/${result.id}`);
    onClose();
    setQuery("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: -20,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.2,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh]"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl mx-4 glass-card rounded-2xl overflow-hidden shadow-2xl border border-border/50"
            variants={modalVariants}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-border/50">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, interviews, reviews..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
              />
              {query && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              >
                <kbd className="text-xs font-mono bg-muted px-2 py-1 rounded">ESC</kbd>
              </button>
            </div>

            {/* Results or Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div ref={resultsRef} className="p-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={result.id}
                      custom={index}
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => handleResultClick(result)}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl text-left transition-colors ${
                        index === selectedIndex
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <Image
                        src={result.image}
                        alt={result.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {result.type} • {result.genre}
                        </p>
                      </div>
                      {index === selectedIndex && (
                        <CornerDownLeft className="w-4 h-4 text-primary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              ) : query.length === 0 ? (
                <div className="p-4 space-y-6">
                  {/* Recent Searches */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      <span>Recent Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search) => (
                        <motion.button
                          key={search}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestionClick(search)}
                          className="px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Trending */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((search) => (
                        <motion.button
                          key={search}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestionClick(search)}
                          className="px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No results found for `{"${query}"}`</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t border-border/50 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  <ArrowDown className="w-3 h-3" />
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="w-3 h-3" />
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded">⌘</kbd>
                <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded">K</kbd>
                Toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
