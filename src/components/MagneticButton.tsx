"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  children: React.ReactNode;
}

/**
 * MagneticButton
 * Implements the "magnetic" feel and sliding background transition.
 * Uses GSAP for high-fidelity animation.
 */
export function MagneticButton({
  variant = "primary",
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const slideRef = useRef<HTMLSpanElement>(null);
  const [ctx, setCtx] = useState<gsap.Context | null>(null);

  useEffect(() => {
    const c = gsap.context(() => {}, buttonRef);
    setCtx(c);
    return () => c.revert();
  }, []);

  const handleMouseEnter = () => {
    if (!ctx) return;
    ctx.add(() => {
      // Magnetic scale
      gsap.to(buttonRef.current, {
        scale: 1.03,
        duration: 0.4,
        ease: "power3.out",
      });
      // Sliding background
      gsap.fromTo(
        slideRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.4, ease: "power2.inOut" }
      );
    });
  };

  const handleMouseLeave = () => {
    if (!ctx) return;
    ctx.add(() => {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(slideRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power2.inOut",
      });
    });
  };

  const variants = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground border border-border",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-3 font-heading font-bold transition-transform",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        ref={slideRef}
        className="absolute inset-0 z-0 translate-x-[-100%] bg-white/10"
      />
    </button>
  );
};
