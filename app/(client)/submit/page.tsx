"use client"
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres } from "@/lib/data";

export default function SubmitContentPage() {
  return (
    <>
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-genre-emo/20 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Send className="w-12 h-12 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl tracking-wider mb-4">
              SUBMIT <span className="text-primary">CONTENT</span>
            </h1>
            <p className="text-muted-foreground">
              Have news, an interview, or a review? Submit it for consideration.
              All submissions are reviewed by our editorial team.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <Card>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label>Post Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" placeholder="Enter article title" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Genre *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((g) => (
                          <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="band">Band/Artist</Label>
                    <Input id="band" placeholder="Band name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea id="content" placeholder="Write your article..." rows={10} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Images</Label>
                  <Input id="images" type="file" accept="image/*" multiple />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="musicLinks">Music Links</Label>
                  <Input id="musicLinks" placeholder="Spotify, YouTube, Bandcamp links" />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
