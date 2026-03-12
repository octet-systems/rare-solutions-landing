import { useState, useEffect } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-border py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-accent font-heading font-bold text-base">RS</span>
            </div>
            <span className={`font-heading font-bold text-xl tracking-tight transition-colors ${
              scrolled ? "text-primary" : "text-white"
            }`}>
              Rare Solutions <span className="text-accent">MW</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-accent ${
                  scrolled ? "text-primary/70" : "text-white/80"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    className={`rounded-full px-6 font-bold transition-all ${
                      scrolled 
                        ? "text-primary hover:bg-primary/5" 
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`gap-2 hover:bg-opacity-10 ${scrolled ? "text-primary hover:bg-primary" : "text-white hover:bg-white"}`}>
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-accent-foreground font-bold text-xs">
                          {user?.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-bold">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl border-border shadow-2xl">
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                      Account
                    </div>
                    <DropdownMenuItem className="font-bold py-3 cursor-pointer rounded-lg">
                      {user?.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive font-bold py-3 cursor-pointer rounded-lg">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/support">
                  <Button 
                    variant="ghost" 
                    className={`rounded-full px-6 font-bold transition-all ${
                      scrolled 
                        ? "text-primary hover:bg-primary/5" 
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Support
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button 
                    variant="ghost" 
                    className={`rounded-full px-5 font-bold transition-all ${
                      scrolled 
                        ? "text-primary hover:bg-primary/5" 
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <User size={18} className="mr-2" />
                    Admin
                  </Button>
                </Link>
                <a href="/#contact">
                  <Button className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-7 font-bold shadow-lg shadow-accent/20 active:scale-95 transition-all">
                    Get a Quote
                  </Button>
                </a>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? "text-primary" : "text-white"}
                >
                  <Menu size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-border p-0 w-full sm:w-[350px]">
                <div className="flex flex-col h-full pt-20 px-8">
                  <div className="flex flex-col gap-8">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-primary text-2xl font-heading font-bold hover:text-accent transition-colors tracking-tight"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <div className="mt-auto mb-12 flex flex-col gap-4">
                    {isAuthenticated ? (
                      <>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full rounded-full py-6 border-border text-primary font-bold">
                            Dashboard
                          </Button>
                        </Link>
                        <Button variant="ghost" onClick={handleLogout} className="w-full rounded-full py-6 text-destructive font-bold">
                          <LogOut className="mr-2" size={18} />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/support" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full rounded-full py-6 border-border text-primary font-bold">
                            Support
                          </Button>
                        </Link>
                        <Link to="/admin" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full rounded-full py-6 text-primary font-bold">
                            <User className="mr-2" size={18} />
                            Admin Login
                          </Button>
                        </Link>
                        <a href="/#contact" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-accent text-accent-foreground hover:bg-gold-light rounded-full py-6 font-bold shadow-xl">
                            Get a Quote
                          </Button>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
