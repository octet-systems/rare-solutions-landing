import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-sm">RS</span>
            </div>
            <span className="font-heading font-bold text-lg text-primary-foreground">
              Rare Solutions <span className="text-accent">MW</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/support">
              <Button variant="outline" className="rounded-full px-5 font-semibold border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Support Portal
              </Button>
            </Link>
            <a href="#contact">
              <Button className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-6 font-semibold shadow-lg shadow-accent/20">
                Get a Quote
              </Button>
            </a>
          </div>

          {/* Mobile Hamburger (Sheet) */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-primary-foreground p-2"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary border-l-primary-foreground/10 p-0 w-[300px]">
                <div className="flex flex-col h-full pt-16 px-6">
                  {/* Mobile Links */}
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-primary-foreground text-xl font-heading font-semibold hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="mt-10 flex flex-col gap-4">
                    <Link to="/support" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                        Support Portal
                      </Button>
                    </Link>
                    <a href="#contact" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-gold-light rounded-full font-semibold shadow-lg">
                        Get a Quote
                      </Button>
                    </a>
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
