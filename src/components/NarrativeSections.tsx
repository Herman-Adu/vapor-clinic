"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Philosophy - "The Manifesto"
 * Dark background, parallax texture, contrasting statements.
 */
export const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto-line",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative min-h-[80vh] w-full overflow-hidden bg-background flex items-center justify-center px-8 md:px-24 border-y border-border/10"
    >
      {/* Parallax Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-20 mix-blend-overlay dark:mix-blend-normal"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1620121692029-d088224efc74?auto=format&fit=crop&q=80&w=2560")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(1) contrast(1.2)",
        }}
      />

      <div className="relative z-10 max-w-4xl text-center">
        <p className="manifesto-line font-data text-xs uppercase tracking-[0.4em] text-foreground/60 mb-8 opacity-0">
          The Biological Standard
        </p>
        <div ref={textRef} className="space-y-12">
          <p className="manifesto-line font-heading text-xl md:text-3xl text-foreground font-light leading-relaxed opacity-0 px-4 md:px-0">
            Most clinical research focuses on <span className="opacity-50 italic">reactive preservation.</span>
          </p>
          <p className="manifesto-line font-drama text-[max(2.5rem,8vw)] leading-tight text-foreground italic opacity-0 px-4 md:px-0">
            We focus on <br />
            <span className="text-accent not-italic font-heading font-bold uppercase tracking-tighter">Proactive Synthesis.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * Protocol - "Sticky Stacking Archive"
 * 3 full-screen cards that stack on scroll with transitions.
 */
export const Protocol: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".protocol-card") as HTMLElement[];
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const nextCard = cards[i + 1];
            if (nextCard) {
              gsap.set(card, {
                scale: 1 - self.progress * 0.1,
                filter: `blur(${self.progress * 20}px)`,
                opacity: 1 - self.progress * 0.5,
              });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Genomic Audit",
      desc: "Deep-sequencing of your biological foundation to identify legacy constraints.",
      animation: <GeometricRotation />,
    },
    {
      num: "02",
      title: "Synthesis Protocol",
      desc: "Architecting customized neural pathways and bio-digital enhancements.",
      animation: <ScanningLaser />,
    },
    {
      num: "03",
      title: "Biological Incubation",
      desc: "Continuous real-time monitoring and adaptive calibration of your new state.",
      animation: <PulsingWaveform />,
    },
  ];

  return (
    <div id="protocol" ref={containerRef} className="bg-black">
      {steps.map((step, i) => (
        <section
          key={i}
          className="protocol-card sticky top-0 h-screen w-full flex items-center justify-center bg-background border-t border-border/20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <span className="font-data text-accent text-sm tracking-[0.5em] mb-4 block">
                STEP_{step.num}
              </span>
              <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter mb-6 md:mb-8 italic leading-tight">
                {step.title}
              </h2>
              <p className="font-sans text-lg md:text-xl text-foreground/50 leading-relaxed max-w-md">
                {step.desc}
              </p>
            </div>
            <div className="relative aspect-square w-full max-w-lg mx-auto flex items-center justify-center">
              {step.animation}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

/* --- Section E Animations --- */

const GeometricRotation = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full text-accent drop-shadow-[0_0_30px_rgba(123,97,255,0.3)]">
    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
    <g className="animate-[spin_20s_linear_infinite]">
      {[...Array(12)].map((_, i) => (
        <rect
          key={i}
          x="95"
          y="20"
          width="10"
          height="160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ transform: `rotate(${i * 15}deg)`, transformOrigin: "center" }}
        />
      ))}
    </g>
  </svg>
);

const ScanningLaser = () => (
  <div className="relative w-full h-full border border-border/20 rounded-full overflow-hidden flex items-center justify-center">
    <div className="grid grid-cols-10 grid-rows-10 gap-4 opacity-20">
      {[...Array(100)].map((_, i) => (
        <div key={i} className="w-1 h-1 bg-accent rounded-full" />
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/30 to-transparent h-1 w-full animate-[scan_3s_ease-in-out_infinite] top-0" />
    <style jsx>{`
      @keyframes scan {
        0% { top: 0% }
        50% { top: 100% }
        100% { top: 0% }
      }
    `}</style>
  </div>
);

const PulsingWaveform = () => (
  <svg viewBox="0 0 200 100" className="w-full h-48 text-accent">
    <path
      d="M 0 50 L 40 50 L 50 20 L 70 80 L 80 50 L 120 50 L 130 10 L 150 90 L 160 50 L 200 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="1000"
      strokeDashoffset="1000"
      className="animate-[waveform_4s_linear_infinite]"
    />
    <style jsx>{`
      @keyframes waveform {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
  </svg>
);
