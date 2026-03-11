import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import the logo
import logoImage from "@assets/IMG_0336_1772540646131.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "/services",
      dropdown: [
        { name: "Orbit Build", href: "/services/orbit-build" },
        { name: "Orbit Reach", href: "/services/orbit-reach" },
        { name: "Orbit Convert", href: "/services/orbit-convert" },
        { name: "Orbit Automate", href: "/services/orbit-automate" },
        { name: "Orbit Insights", href: "/services/orbit-insights" },
      ]
    },
    { name: "Industries", href: "/industries" },
    { name: "Framework", href: "/framework" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src={logoImage} alt="SkyRich Tech Solutions" className="h-10 object-contain" />
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-glow transition-all border-l border-white/20 pl-3">
            Orbit
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  location === link.href || location.startsWith(link.href + "/") ? "text-primary text-glow" : "text-slate-300"
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
              </Link>
              
              {/* Dropdown */}
              {link.dropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                  <div className="bg-[#0F1523] border border-white/10 rounded-xl shadow-2xl overflow-hidden w-48 py-2">
                    {link.dropdown.map((drop) => (
                      <Link 
                        key={drop.name} 
                        href={drop.href}
                        className={`block px-4 py-2 text-sm hover:bg-white/5 hover:text-primary transition-colors ${
                          location === drop.href ? "text-primary bg-white/5" : "text-slate-300"
                        }`}
                      >
                        {drop.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-primary hover:bg-primary/90 text-[#0B0F1A] font-semibold rounded-full px-6 button-glow transition-all">
            <Link href="/contact">Get Growth Strategy</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0F1523] border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col gap-2">
              <Link 
                href={link.href}
                className="text-lg font-medium text-slate-200 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="pl-4 flex flex-col gap-2 border-l border-white/10 ml-2">
                  {link.dropdown.map((drop) => (
                    <Link 
                      key={drop.name} 
                      href={drop.href}
                      className="text-sm text-slate-400 hover:text-primary transition-colors"
                    >
                      {drop.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold w-full rounded-full button-glow">
            <Link href="/contact">Get Growth Strategy</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
