"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown, User, LogOut, Bookmark, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchModal } from "@/components/client/SearchModal";
// import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "News", href: "/news" },
  { name: "Interviews", href: "/interviews" },
  { name: "Reviews", href: "/reviews" },
  { name: "Directory", href: "/directory" },
  {
    name: "Promote",
    href: "#",
    children: [
      { name: "Your Band", href: "/promote/band" },
      { name: "Your Label", href: "/promote/label" },
      { name: "Your Event", href: "/promote/event" },
      { name: "Your Jamming Hall", href: "/promote/jamming-hall" },
    ],
  },
  { name: "Submit", href: "/submit" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoteOpen, setPromoteOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // const { user, profile, isAdmin, isEditor, signOut } = useAuth();

  const profile = {
    id: "1",   
    email: "admin@riffnoise.com",
    display_name: "Kritan Dura",
    avatar_url: "https://github.com/shadcn.png",
    role: "admin",
  };

  const user = {
    id: "1",
    email: "admin@riffnoise.com",
    display_name: "Kritan Dura",
    avatar_url: "https://github.com/shadcn.png",
    role: "user",
  };

  const isAdmin = true;
  const isEditor = true;

  const handleSignOut = async () => {
    // await signOut();
    router.push("/");
  };

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="bg-background glass fixed top-0 left-0 right-0 z-50 border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-10 h-10 bg-primary flex items-center justify-center shadow-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-display text-2xl text-primary-foreground">R</span>
            </motion.div>
            <span className="font-display text-2xl lg:text-3xl tracking-wider hidden sm:block">
              RIFF<span className="text-primary group-hover:text-glow transition-all">NOISE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setPromoteOpen(true)}
                    onMouseLeave={() => setPromoteOpen(false)}
                  >
                    <button className="flex items-center gap-1 font-semibold text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {promoteOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-sm shadow-lg overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-primary transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "font-semibold text-sm uppercase tracking-wider transition-colors",
                      pathname === item.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 lg:gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden lg:flex rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-display">
                        {profile?.display_name?.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{profile?.display_name || "User"}</span>
                      <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=bookmarks" className="cursor-pointer">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Bookmarks
                    </Link>
                  </DropdownMenuItem>
                  {(isAdmin || isEditor) && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="sm" className="hidden lg:flex" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="space-y-2">
                      <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        {item.name}
                      </span>
                      <div className="pl-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block font-semibold text-sm uppercase tracking-wider transition-colors",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                {user ? (
                  <>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>
                    </Button>
                    {(isAdmin || isEditor) && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button variant="hero" className="w-full" asChild>
                    <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}