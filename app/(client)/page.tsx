"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Flame, Music2, Newspaper, Mic2, Disc3 } from "lucide-react";
import { GenreBar } from "@/components/client/GenreBar";
import { ArticleCard } from "@/components/client/ArticleCard";
import { SectionHeader } from "@/components/client/index/SectionHeader";
import { AdBanner } from "@/components/client/AdBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { ScrollProgress } from "@/components/ScrollProgress";
import { GlowOrb, FloatingElement, StaggerContainer, staggerItemVariants } from "@/components/client/ParallaxSection" 
import { mockArticles, mockBands, genres } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
// import { SEO } from "@/components/SEO";

// Smooth spring config
const smoothSpring = { stiffness: 100, damping: 30, restDelta: 0.001 };

export default function Index() {
  const featuredArticle = mockArticles.find((a) => a.featured && a.breaking);
  const latestNews = mockArticles.filter((a) => a.type === "news").slice(0, 6);
  const featuredInterviews = mockArticles.filter((a) => a.type === "interview").slice(0, 3);
  const latestReviews = mockArticles.filter((a) => a.type === "review").slice(0, 4);
  const trendingArticles = mockArticles.slice(0, 5);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Apply spring physics for buttery smooth parallax
  const rawHeroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rawHeroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rawHeroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  
  const heroY = useSpring(rawHeroY, smoothSpring);
  const heroOpacity = useSpring(rawHeroOpacity, smoothSpring);
  const heroScale = useSpring(rawHeroScale, smoothSpring);

  return (
      <>
      {/* <SEO 
        description="RIFFNOISE is your premier source for rock, metal, hardcore, punk, and alternative music news, interviews, and reviews."
      /> */}
      {/* <ScrollProgress /> */}

      {/* Genre Bar */}
      <GenreBar />

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <AdBanner position="top" />
      </div>

      {/* Hero / Featured Article with Parallax */}
      {featuredArticle && (
        <section ref={heroRef} className="relative container mx-auto px-4 lg:px-8 py-8 overflow-hidden parallax-container">
          {/* Background Glow Effects */}
          <GlowOrb className="w-96 h-96 bg-primary -top-20 -left-20" pulseSpeed={10} />
          <GlowOrb className="w-72 h-72 bg-genre-emo top-40 right-0" pulseSpeed={8} />
          
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale, willChange: "transform, opacity" }}
            className="relative z-10 parallax-layer"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ArticleCard article={featuredArticle} variant="featured" />
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-12 relative">
        {/* Mesh Background */}
        <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* Latest News */}
            <section>
              <SectionHeader title="LATEST" accent="NEWS" href="/news">
                <Newspaper className="w-5 h-5 text-primary" />
              </SectionHeader>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
                {latestNews.slice(0, 4).map((article) => (
                  <motion.div
                    key={article.id}
                    variants={staggerItemVariants}
                    className="hover-lift"
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </StaggerContainer>
            </section>

            {/* Inline Ad */}
            <AdBanner position="inline" />

            {/* Featured Interviews */}
            <section>
              <SectionHeader title="FEATURED" accent="INTERVIEWS" href="/interviews">
                <Mic2 className="w-5 h-5 text-primary" />
              </SectionHeader>
              <div className="space-y-6">
                {featuredInterviews.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ArticleCard article={article} variant="horizontal" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Latest Reviews */}
            <section>
              <SectionHeader title="LATEST" accent="REVIEWS" href="/reviews">
                <Disc3 className="w-5 h-5 text-primary" />
              </SectionHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestReviews.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="hover-lift"
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Sidebar Ad */}
            <AdBanner position="sidebar" />

            {/* Trending */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-sm p-6 border-glow"
            >
              <div className="flex items-center gap-2 mb-6">
                <FloatingElement delay={0}>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </FloatingElement>
                <h3 className="font-display text-xl tracking-wider">TRENDING NOW</h3>
              </div>
              <div className="space-y-4">
                {trendingArticles.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <span className="font-display text-3xl text-primary/30 group-hover:text-primary/60 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArticleCard article={article} variant="compact" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Genre Spotlight */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-sm p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <FloatingElement delay={0.5}>
                  <Flame className="w-5 h-5 text-primary" />
                </FloatingElement>
                <h3 className="font-display text-xl tracking-wider">EXPLORE GENRES</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, i) => (
                  <motion.div
                    key={genre.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/news?genre=${genre.id}`}>
                      <Badge
                        variant={genre.color}
                        className="cursor-pointer hover:opacity-80 transition-all hover:scale-110"
                      >
                        {genre.name}
                      </Badge>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Featured Bands */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-sm p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <FloatingElement delay={1}>
                  <Music2 className="w-5 h-5 text-primary" />
                </FloatingElement>
                <h3 className="font-display text-xl tracking-wider">FEATURED BANDS</h3>
              </div>
              <div className="space-y-4">
                {mockBands.slice(0, 3).map((band, i) => (
                  <motion.div
                    key={band.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-sm overflow-hidden shrink-0 ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                      <Image
                        src={band.image}
                        alt={band.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={600}
                        height={600}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                        {band.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{band.country}</p>
                    </div>
                    <Badge variant={band.genre} className="text-[10px] px-2 py-0.5">
                      {band.genre}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 hover:border-primary/50" asChild>
                <Link href="/promote/band">Promote Your Band</Link>
              </Button>
            </motion.div>

            {/* Another Sidebar Ad */}
            <AdBanner position="sidebar" />
          </aside>
        </div>
      </div>

      {/* Sponsored Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-spotlight" />
        <div className="absolute inset-0 bg-card/80" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeader title="SPONSORED" accent="CONTENT" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockArticles
              .filter((a) => a.sponsored)
              .slice(0, 3)
              .map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="hover-lift"
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Parallax */}
      <section className="py-24 relative overflow-hidden noise-overlay">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 70% 80%, hsl(280 70% 50% / 0.1) 0%, transparent 50%)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
        
        {/* Floating Orbs */}
        <GlowOrb className="w-64 h-64 bg-primary top-10 left-10" />
        <GlowOrb className="w-48 h-48 bg-genre-punk bottom-10 right-20" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              className="font-display text-5xl md:text-7xl tracking-wider mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              PROMOTE YOUR{" "}
              <span className="text-primary text-glow">MUSIC</span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Get your band, label, or event featured on RIFFNOISE and reach thousands of
              dedicated music fans worldwide.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="hero" size="xl" className="shadow-glow" asChild>
                <Link href="/promote/band">Promote Your Band</Link>
              </Button>
              <Button variant="outline" size="xl" className="hover:border-primary/50" asChild>
                <Link href="/promote/label">Promote Your Label</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <AdBanner position="footer" />
      </div>
    </>
  );
}
 