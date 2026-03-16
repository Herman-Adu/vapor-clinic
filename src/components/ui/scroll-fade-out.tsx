"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFadeOutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A generic GSAP wrapper that causes its children to perform a clean,
 * parallax fade-out as the top of the container starts leaving the viewport.
 * 
 * Perfect for preventing harsh overlapping of sections against a transparent Navbar.
 */
export function ScrollFadeOut({ children, className }: ScrollFadeOutProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a scrub timeline tied specifically to this container's exit
      gsap.to(wrapperRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          // Starts the fade out when the element's bottom hits the viewport bottom
          start: "bottom bottom",
          // Ends the fade out when the element's bottom hits the viewport top
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={className || "w-full"}>
      {children}
    </div>
  );
}
