"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Phase Data ──────────────────────────────────────────────────────────────
const PHASES = [
  {
    id: "observe",
    index: "01",
    label: "Observe",
    heading: "The architecture,\nelegant by design.",
    body: "A system engineered with no visible friction — seamless to the stakeholder, impenetrable to the adversary.",
    stat: "AES-256",
    statLabel: "Encryption Standard",
    filter: "grayscale(0%) contrast(100%) brightness(100%) invert(0%) sepia(0%)",
  },
  {
    id: "analyse",
    index: "02",
    label: "Analyse",
    heading: "Structural integrity\nat every layer.",
    body: "Seven cryptographic layers nest inside each other. Compromise one — the rest remain absolute.",
    stat: "7 Layers",
    statLabel: "Cryptographic Depth",
    filter: "grayscale(100%) contrast(200%) brightness(130%) invert(0%) sepia(0%)",
  },
  {
    id: "penetrate",
    index: "03",
    label: "Penetrate",
    heading: "Nothing hidden.\nEverything verified.",
    body: "Zero-knowledge proofs allow full auditability without exposure. The ledger proves itself.",
    stat: "ZK Proof",
    statLabel: "Zero-Knowledge Protocol",
    filter: "grayscale(100%) contrast(260%) brightness(80%) invert(100%) sepia(20%) hue-rotate(200deg)",
  },
  {
    id: "activate",
    index: "04",
    label: "Activate",
    heading: "The protocol\ninitiates.",
    body: "When conditions are met, execution is instantaneous and irreversible. No delays. No appeals. The contract is sovereign.",
    stat: "< 3ms",
    statLabel: "Execution Latency",
    filter: "grayscale(100%) contrast(300%) brightness(90%) invert(100%) sepia(60%) hue-rotate(170deg) saturate(400%)",
  },
];

const IMAGE_URL = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop";

export function XRayReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const phaseLabelRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // Panels
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !containerRef.current || !imageRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: containerRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Entrance
      tl.fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 0);

      // Global Progress
      if (progressFillRef.current) {
        tl.fromTo(progressFillRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: PHASES.length * 4 }, 0);
      }

      PHASES.forEach((phase, i) => {
        const start = i * 4;
        const isLast = i === PHASES.length - 1;

        // 1. Image Filter & Scale
        tl.to(imageRef.current, {
          filter: phase.filter,
          scale: 1 + i * 0.015,
          duration: 1.5,
          ease: "sine.inOut"
        }, start);

        // 2. HUD Label
        if (phaseLabelRef.current) {
          tl.to(phaseLabelRef.current, { opacity: 0, duration: 0.2 }, start);
          tl.call(() => { if (phaseLabelRef.current) phaseLabelRef.current.textContent = `${phase.index} — ${phase.label.toUpperCase()}`; }, [], start + 0.2);
          tl.to(phaseLabelRef.current, { opacity: 1, duration: 0.2 }, start + 0.35);
        }

        // 3. Desktop Panels (Left/Right)
        [leftRefs.current[i], rightRefs.current[i]].forEach((el, j) => {
          if (!el) return;
          tl.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, start + 0.4 + (j * 0.15));
          if (!isLast) tl.to(el, { y: -40, opacity: 0, duration: 0.8 }, start + 3.2);
        });

        // 4. Mobile Panel (Unified HUD)
        const mobileEl = mobileRefs.current[i];
        if (mobileEl) {
          tl.fromTo(mobileEl, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, start + 0.5);
          if (!isLast) tl.to(mobileEl, { y: -30, opacity: 0, duration: 0.8 }, start + 3.2);
        }
      });

      // Exit
      tl.to(imageRef.current, { scale: 0.8, opacity: 0, duration: 1 }, PHASES.length * 4 - 0.5);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="diagnostics"
      ref={sectionRef} 
      className="relative w-full"
      style={{ height: "600vh" }}
    >
      <div 
        ref={containerRef} 
        className="relative h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden px-6"
      >
        {/* Subtle HUD background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* ── CENTRAL HUD REVEAL ── */}
        <div className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center justify-center">
          
          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 w-full">
            
            {/* [DESKTOP ONLY] LEFT PANEL */}
            <div className="hidden lg:block relative w-[30%] h-[400px]">
              {PHASES.map((phase, i) => (
                <div 
                  key={phase.id + "-l"}
                  ref={(el) => { leftRefs.current[i] = el; }}
                  className="absolute inset-0 flex flex-col justify-center text-right pr-12 opacity-0"
                >
                  <p className="font-data text-[10px] text-accent uppercase tracking-[0.4em] mb-4">Diagnostics_{phase.index}</p>
                  <h3 className="font-heading text-4xl font-bold text-foreground mb-6 leading-tight uppercase italic tracking-tighter">
                    {phase.heading.split("\n").map((l, j) => <span key={j} className="block">{l}</span>)}
                  </h3>
                  <p className="font-sans text-sm text-foreground/40 leading-relaxed max-w-xs ml-auto">
                    {phase.body}
                  </p>
                </div>
              ))}
            </div>

            {/* [FOCAL IMAGE] - Shared between views */}
            <div className="relative flex flex-col items-center shrink-0">
              <div 
                className="relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-black" 
                style={{ width: 'min(380px, 80vw)', height: 'min(500px, 50vh)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <img 
                  ref={imageRef} 
                  src={IMAGE_URL} 
                  alt="Architecture" 
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                />
                
                {/* HUD Overlays */}
                <div className="absolute inset-0 p-8 pointer-events-none">
                  {/* Digital Brackets */}
                  <span className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-accent/20 rounded-tl-2xl" />
                  <span className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-accent/20 rounded-br-2xl" />
                  
                  {/* Scanline Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* HUD LABEL (Below Image) */}
              <div className="mt-8 flex flex-col items-center w-full px-4">
                <div className="flex items-center justify-between w-full mb-3">
                  <span ref={phaseLabelRef} className="font-data text-[10px] md:text-[12px] text-accent italic tracking-[0.4em] uppercase">
                    01 — OBSERVE
                  </span>
                  <div className="flex gap-1.5 items-center">
                    {PHASES.map((p, k) => <div key={k} className="w-1 h-1 rounded-full bg-accent/20" />)}
                  </div>
                </div>
                <div className="w-full h-px bg-white/5 relative overflow-hidden rounded-full">
                  <div ref={progressFillRef} className="absolute inset-0 bg-accent origin-left w-full h-full" />
                </div>
              </div>
            </div>

            {/* [DESKTOP ONLY] RIGHT PANEL */}
            <div className="hidden lg:block relative w-[30%] h-[400px]">
              {PHASES.map((phase, i) => (
                <div 
                  key={phase.id + "-r"}
                  ref={(el) => { rightRefs.current[i] = el; }}
                  className="absolute inset-0 flex flex-col justify-center text-left pl-12 opacity-0"
                >
                  <div className="font-data text-7xl font-black text-accent mb-2 tracking-tighter italic">
                    {phase.stat}
                  </div>
                  <div className="w-16 h-1 bg-white/10 mb-4" />
                  <p className="font-data text-[11px] text-foreground/30 uppercase tracking-[0.5em]">{phase.statLabel}</p>
                </div>
              ))}
            </div>

            {/* ── MOBILE HUD (UNIFIED CARD) ── */}
            <div className="lg:hidden relative w-full h-[200px] flex items-center justify-center">
              {PHASES.map((phase, i) => (
                <div 
                  key={phase.id + "-m"}
                  ref={(el) => { mobileRefs.current[i] = el; }}
                  className="absolute inset-0 flex flex-col items-center text-center opacity-0 px-4"
                >
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3 tracking-tight italic uppercase">
                    {phase.heading.replace("\n", " ")}
                  </h3>
                  <p className="font-sans text-xs text-foreground/40 leading-relaxed mb-6 max-w-[280px]">
                    {phase.body}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-data text-3xl font-bold text-accent italic">{phase.stat}</span>
                    <span className="w-px h-6 bg-white/10" />
                    <span className="font-data text-[9px] text-foreground/30 uppercase tracking-widest">{phase.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Global HUD Identifier */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20 hidden md:flex">
          <span className="h-px w-24 bg-white/10" />
          <span className="font-data text-[9px] uppercase tracking-[0.5em]">System_Interface_Diagnostics</span>
          <span className="h-px w-24 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
