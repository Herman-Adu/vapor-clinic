"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MagneticButton } from "./MagneticButton";

/**
 * Hero - "The Opening Shot"
 * 100dvh, full-bleed bg, bottom-left content.
 * Pattern: [Tech noun] beyond (Bold Sans) / [Boundary word]. (Massive Serif Italic)
 */
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      tl.fromTo(
        [text1Ref.current, text2Ref.current, ctaRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-background flex items-center justify-center pt-24 px-8 md:px-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 dark:opacity-40 transition-transform duration-[10s] hover:scale-110"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=2560")',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Content */}
      <div className="relative z-[2] max-w-5xl text-center flex flex-col items-center">
        <h1 className="flex flex-col gap-2">
          <span
            ref={text1Ref}
            className="font-heading text-2xl font-bold tracking-[0.2em] uppercase text-accent md:text-3xl opacity-0"
          >
            Biotech beyond
          </span>
          <span
            ref={text2Ref}
            className="font-drama text-[max(4rem,15vw)] leading-[0.85] text-foreground lowercase italic opacity-0"
          >
            Mortality.
          </span>
        </h1>
        
        <div ref={ctaRef} className="mt-12 opacity-0 flex flex-col items-center">
          <MagneticButton variant="accent" className="px-10 py-4 text-lg">
            Join the Waitlist
          </MagneticButton>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-accent/30" />
            <p className="font-data text-[10px] uppercase tracking-widest text-foreground/50">
              System Status: Operational // v1.0.4
            </p>
            <div className="h-[1px] w-12 bg-accent/30" />
          </div>
        </div>
      </div>
    </section>
  );
};
