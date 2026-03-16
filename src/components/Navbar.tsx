"use client";

import React, { useState, useEffect } from "react";
import { MagneticButton } from "./MagneticButton";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

/**
 * Navbar - "Protocol Command"
 * Full-width fixed header matching the width of focal sections.
 * Logo left, center navigation, actionable elements right.
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", id: "features" },
    { name: "Philosophy", id: "philosophy" },
    { name: "Diagnostics", id: "diagnostics" },
    { name: "Horizon", id: "scrollytelling" },
    { name: "Vault", id: "vault" },
    { name: "Network", id: "network" },
    { name: "Membership", id: "membership" },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 z-[100] w-full transition-all duration-700 border-b",
          isScrolled 
            ? "py-4 bg-background/80 backdrop-blur-xl border-white/5 shadow-2xl" 
            : "py-6 bg-transparent border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo (Left) */}
          <div className="flex-1">
            <a href="#hero" className="font-heading text-xl font-bold tracking-tight text-foreground flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Vapor <span className="text-accent italic font-black">Clinic</span>
            </a>
          </div>

          {/* Links (Center) - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative py-1"
              >
                <span className="font-data text-[9px] xl:text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors group-hover:text-accent duration-300">
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          {/* Actions (Right) */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <MagneticButton variant="accent" className="px-4 md:px-8 py-2 md:py-2.5 rounded-full font-data text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] uppercase font-bold">
              Join
            </MagneticButton>
            
            {/* Mobile Menu Trigger */}
            <button 
              className="lg:hidden p-2 text-foreground/50 hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center lg:hidden",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
      )}>
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleNavClick}
              className="font-heading text-4xl font-bold tracking-tighter italic hover:text-accent transition-colors"
            >
              {item.name}.
            </a>
          ))}
          <div className="mt-8">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};
