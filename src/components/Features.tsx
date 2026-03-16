"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Activity, Cpu, Calendar, Save } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Features - "Interactive Functional Artifacts"
 * Three specialized cards with unique interaction patterns.
 */
export const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-32 px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto mb-24 text-center">
        <span className="font-data text-accent text-sm tracking-[0.4em] mb-4 uppercase block">
          Functional_Artifacts
        </span>
        <h2 className="font-heading text-6xl font-bold tracking-tighter text-foreground mb-6 italic">
          Integrated Performance.
        </h2>
        <div className="h-[1px] w-24 bg-accent/30 mx-auto" />
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <CursorProtocolScheduler />
      </div>
    </section>
  );
};

/* --- Card 1: Diagnostic Shuffler --- */
const DiagnosticShuffler = () => {
  const [items, setItems] = useState([
    { id: 1, label: "Neural Interface α", value: "98.2%" },
    { id: 2, label: "Synaptic Bridge β", value: "Active" },
    { id: 3, label: "Core Link γ", value: "Verified" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FeatureCard
      icon={<Cpu size={20} />}
      title="Neural Synthesis"
      description="Bi-directional latency reduction for cognitive extension."
    >
      <div className="relative h-48 mt-8 flex flex-col items-center justify-center">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute w-full max-w-[200px] p-4 rounded-2xl border border-border bg-card/40 backdrop-blur-md shadow-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${(i - 1) * 40}px) scale(${1 - i * 0.05})`,
              zIndex: 3 - i,
              opacity: 1 - i * 0.3,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-data text-[10px] uppercase text-accent">{item.label}</span>
              <span className="font-data text-[10px] text-foreground/50">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </FeatureCard>
  );
};

/* --- Card 2: Telemetry Typewriter --- */
const TelemetryTypewriter = () => {
  const text = ">> GENOMIC_OPTIMIZATION_IN_PROGRESS...\n>> ALIGNING_NEURAL_PATHWAYS...\n>> SYNTHESIS_COMPLETE_100%";
  const [display, setDisplay] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i = (i + 1) % (text.length + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <FeatureCard
      icon={<Activity size={20} />}
      title="Genomic Sculpting"
      description="Precision gene-editing via bio-digital feedback loops."
    >
      <div className="mt-8 p-4 rounded-xl bg-black border border-accent/20 font-data text-[11px] text-accent/80 min-h-[120px]">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="uppercase tracking-widest text-[9px]">Live Feed</span>
        </div>
        <pre className="whitespace-pre-wrap leading-relaxed">
          {display}
          <span className="inline-block w-1.5 h-3.5 bg-accent ml-1 animate-pulse" />
        </pre>
      </div>
    </FeatureCard>
  );
};

/* --- Card 3: Cursor Protocol Scheduler --- */
const CursorProtocolScheduler = () => {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const cursorRef = useRef<SVGSVGElement>(null);
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(cursorRef.current, { x: 80, y: 40, duration: 1.5, ease: "power2.inOut" })
      .to(cursorRef.current, { scale: 0.9, duration: 0.2 })
      .add(() => setActiveDay(2)) // Click Monday (i=2)
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      .to(cursorRef.current, { x: 160, y: 100, duration: 1, ease: "power2.inOut" })
      .to(cursorRef.current, { scale: 0.9, duration: 0.2 })
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      .to(cursorRef.current, { opacity: 0, duration: 0.5 })
      .add(() => setActiveDay(null))
      .to(cursorRef.current, { x: 0, y: 0, opacity: 1, duration: 0.1 });
  }, []);

  return (
    <FeatureCard
      icon={<Calendar size={20} />}
      title="Hyper-Performance"
      description="Adaptive protocol scheduling for dynamic lifestyle integration."
    >
      <div className="relative mt-8 p-6 rounded-2xl border border-border bg-card/20 overflow-hidden">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <div
              key={i}
              className={cn(
                "h-8 flex items-center justify-center rounded-lg border border-border font-data text-[10px] transition-colors",
                activeDay === i ? "bg-accent border-accent text-white" : "text-foreground/30"
              )}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border font-data text-[9px] text-foreground/40 uppercase">
            <Save size={10} /> Save Changes
          </div>
        </div>
        {/* Animated Cursor */}
        <svg
          ref={cursorRef}
          className="absolute z-10 w-4 h-4 text-accent drop-shadow-lg pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="currentColor" />
        </svg>
      </div>
    </FeatureCard>
  );
};

/* --- Shared FeatureCard Wrapper --- */
const FeatureCard = ({ icon, title, description, children, className }: any) => {
  return (
    <div className={cn(
      "p-8 rounded-[2.5rem] border border-border bg-card/10 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 shadow-2xl group",
      className
    )}>
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-heading font-bold text-xl tracking-tight">{title}</h3>
      </div>
      <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-8">
        {description}
      </p>
      {children}
    </div>
  );
};
