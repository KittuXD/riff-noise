"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article, getGenreVariant } from "@/lib/data";
import { BookmarkButton } from "@/components/client/BookmarkButton";
import { ShareButton } from "@/components/client/ShareButton";
import Image from "next/image";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "horizontal" | "compact";
  showActions?: boolean;
}

export function ArticleCard({ article, variant = "default", showActions = true }: ArticleCardProps) {
  const genreVariant = getGenreVariant(article.genre);
  const articleUrl = `/${article.type}/${article.id}`;
  
  // Safe way to get full URL
  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${articleUrl}`;
    }
    return articleUrl;
  };

  if (variant === "featured") {
    return (
      <Link href={articleUrl}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative h-125 md:h-150 rounded-sm overflow-hidden group border border-border/50"
        >
          <motion.img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
          
          {/* Action buttons */}
          {showActions && (
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <BookmarkButton 
                articleId={article.id} 
                articleTitle={article.title} 
                size="sm" 
                className="bg-background/80 backdrop-blur-sm" 
              />
              <ShareButton 
                title={article.title} 
                url={getFullUrl()} 
                size="sm" 
                className="bg-background/80 backdrop-blur-sm" 
              />
            </div>
          )}
          
          {/* Shimmer overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {article.breaking && <Badge variant="breaking">Breaking</Badge>}
              <Badge variant={genreVariant}>{article.genre}</Badge>
              {article.sponsored && <Badge variant="sponsored">Sponsored</Badge>}
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-5xl lg:text-6xl tracking-wider mb-4 leading-tight group-hover:text-glow transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {article.title}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-4 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {article.excerpt}
            </motion.p>
            <motion.div
              className="flex items-center gap-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={articleUrl}>
        <Card hover className="overflow-hidden group">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative aspect-video md:aspect-auto">
              <Image
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
                width={1200}
                height={800}
              />
              {/* Action buttons */}
              {showActions && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookmarkButton 
                    articleId={article.id} 
                    articleTitle={article.title} 
                    size="sm" 
                    className="bg-background/80 backdrop-blur-sm h-7 w-7" 
                  />
                  <ShareButton 
                    title={article.title} 
                    url={getFullUrl()} 
                    size="sm" 
                    className="bg-background/80 backdrop-blur-sm h-7 w-7" 
                  />
                </div>
              )}
            </div>
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={genreVariant}>{article.genre}</Badge>
                {article.rating && (
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{article.rating}/10</span>
                  </div>
                )}
              </div>
              <h3 className="font-display text-xl md:text-2xl tracking-wider mb-2 leading-tight line-clamp-2">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <span className="text-primary flex items-center gap-1 text-sm font-semibold">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={articleUrl}>
        <div className="flex gap-4 group">
          <div className="w-20 h-20 shrink-0 rounded-sm overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              width={1200}
              height={800}
            />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant={genreVariant} className="mb-2 text-[10px] px-2 py-0.5">
              {article.genre}
            </Badge>
            <h4 className="font-display text-sm tracking-wider leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <span className="text-xs text-muted-foreground">
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={articleUrl}>
      <Card hover className="overflow-hidden h-full group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {article.sponsored && (
            <div className="absolute top-3 right-3">
              <Badge variant="sponsored">Sponsored</Badge>
            </div>
          )}
          {/* Action buttons */}
          {showActions && (
            <div className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <BookmarkButton 
                articleId={article.id} 
                articleTitle={article.title} 
                size="sm" 
                className="bg-background/80 backdrop-blur-sm h-7 w-7" 
              />
              <ShareButton 
                title={article.title} 
                url={getFullUrl()} 
                size="sm" 
                className="bg-background/80 backdrop-blur-sm h-7 w-7" 
              />
            </div>
          )}
        </div>
        <CardContent className="p-5 relative">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant={genreVariant} className="transition-transform group-hover:scale-105">{article.genre}</Badge>
            {article.rating && (
              <div className="flex items-center gap-1 text-primary">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-sm">{article.rating}/10</span>
              </div>
            )}
          </div>
          <h3 className="font-display text-lg md:text-xl tracking-wider mb-2 leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}