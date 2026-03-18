"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { GlowOrb } from "@/components/ParallaxSection";

const footerLinks = {
  magazine: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Advertise", href: "/advertise" },
    { name: "Careers", href: "/careers" },
  ],
  content: [
    { name: "News", href: "/news" },
    { name: "Interviews", href: "/interviews" },
    { name: "Reviews", href: "/reviews" },
    { name: "Features", href: "/features" },
  ],
  promote: [
    { name: "Your Band", href: "/promote/band" },
    { name: "Your Label", href: "/promote/label" },
    { name: "Your Event", href: "/promote/event" },
    { name: "Submit Content", href: "/submit" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative bg-card/50 border-t border-border overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      {/* <GlowOrb className="w-96 h-96 bg-primary -bottom-48 -left-48" /> */}

      {/* Newsletter Section */}
      <div className="relative border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl md:text-4xl tracking-wider mb-4">
              STAY IN THE <span className="text-primary text-glow">LOOP</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              Get the latest news, interviews, and reviews delivered straight to
              your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
              />
              <Button variant="hero" type="submit" className="shadow-glow">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <motion.div
            className="col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <motion.div
                className="w-10 h-10 bg-primary flex items-center justify-center shadow-glow"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-display text-2xl text-primary-foreground">
                  R
                </span>
              </motion.div>
              <span className="font-display text-2xl tracking-wider">
                RIFF
                <span className="text-primary group-hover:text-glow transition-all">
                  NOISE
                </span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Your source for rock, metal, hardcore, punk, and alternative music
              news, interviews, and reviews.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card rounded-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {[
            { title: "MAGAZINE", links: footerLinks.magazine },
            { title: "CONTENT", links: footerLinks.content },
            { title: "PROMOTE", links: footerLinks.promote },
            { title: "LEGAL", links: footerLinks.legal },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h4 className="font-display text-lg tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 RIFFNOISE. All rights reserved.</p>
            <p>Built with passion for the underground music scene.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;