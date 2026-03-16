"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import { Check, Shield, Zap, Crown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrollytelling - "Scrollytelling Horizon"
 * Sticky media panel with phasing content blocks.
 */
export const Scrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers = gsap.utils.toArray(".scrolly-step") as HTMLElement[];
      triggers.forEach((trigger, i) => {
        ScrollTrigger.create({
          trigger: trigger,
          start: "top center",
          onEnter: () => setStep(i + 1),
          onEnterBack: () => setStep(i + 1),
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const mediaUrls = [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1000",
  ];

  return (
    <section id="scrollytelling" ref={containerRef} className="relative bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Scrolly Content */}
        <div className="w-full lg:w-1/2 px-6 md:px-24 py-16 lg:py-32 space-y-16 lg:space-y-[60vh]">
          {/* Step 1 */}
          <div id="step-1" className="scrolly-step min-h-0 lg:min-h-[40vh] flex flex-col justify-center">
            {/* Mobile Image Overlay */}
            <div className="lg:hidden mb-8 aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 shadow-xl bg-card/5">
              <img src={mediaUrls[0]} alt="Neural" className="w-full h-full object-cover" />
            </div>

            <span className="font-data text-accent text-[10px] md:text-xs tracking-widest uppercase mb-4 block">Archive_01</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter mb-6 lg:mb-8 leading-tight">Neural Architecture.</h2>
            <p className="font-sans text-base md:text-lg text-foreground/50 leading-relaxed max-w-md">
              Every interface is custom-mapped to your specific synaptic patterns, ensuring zero-latency biological integration.
            </p>
          </div>

          {/* Step 2 */}
          <div id="step-2" className="scrolly-step min-h-0 lg:min-h-[40vh] flex flex-col justify-center">
            {/* Mobile Image Overlay */}
            <div className="lg:hidden mb-8 aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 shadow-xl bg-card/5">
              <img src={mediaUrls[1]} alt="Data" className="w-full h-full object-cover" />
            </div>

            <span className="font-data text-accent text-[10px] md:text-xs tracking-widest uppercase mb-4 block">Archive_02</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter mb-6 lg:mb-8 leading-tight">Data Liquidity.</h2>
            <p className="font-sans text-base md:text-lg text-foreground/50 leading-relaxed max-w-md">
              Secure, cross-border genomic data transfer powered by decentralized vault nodes and quantum hydration.
            </p>
          </div>

          {/* Step 3 */}
          <div id="step-3" className="scrolly-step min-h-0 lg:min-h-[40vh] flex flex-col justify-center">
             {/* Mobile Image Overlay */}
             <div className="lg:hidden mb-8 aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 shadow-xl bg-card/5">
              <img src={mediaUrls[2]} alt="Systemic" className="w-full h-full object-cover" />
            </div>

            <span className="font-data text-accent text-[10px] md:text-xs tracking-widest uppercase mb-4 block">Archive_03</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter mb-6 lg:mb-8 leading-tight">Systemic Immersion.</h2>
            <p className="font-sans text-base md:text-lg text-foreground/50 leading-relaxed max-w-md">
              Continuous calibration ensures that the protocol evolves alongside your biological state.
            </p>
          </div>
        </div>

        {/* Sticky Media (Desktop Only) */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 p-12 lg:p-16">
          <div className="relative w-full h-full rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl bg-card/5">
            {mediaUrls.map((url, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                  step === i + 1 ? "opacity-100 scale-100" : "opacity-0 scale-110"
                )}
              >
                <img src={url} alt="Scrollytelling" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </div>
            ))}
            {/* HUD Element */}
            <div className="absolute bottom-12 left-12 flex items-center gap-6">
              <span className="font-data text-5xl text-accent font-bold italic tracking-tighter">0{step}</span>
              <div className="h-[1px] w-32 bg-white/10 relative">
                <div 
                  className="absolute inset-0 bg-accent transition-all duration-700 ease-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


/**
 * Membership - "Protocol Access"
 * Three-tier pricing grid.
 */
export const Membership: React.FC = () => {
  const plans = [
    {
      name: "Essential",
      price: "$2k",
      icon: <Zap size={20} />,
      features: ["Genomic Audit", "Weekly Calibration", "Basic Synthesis"],
    },
    {
      name: "Performance",
      price: "$12k",
      icon: <Shield size={20} />,
      features: ["Real-time Monitoring", "Bi-weekly Incubation", "Full Neural Integration"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      icon: <Crown size={20} />,
      features: ["In-house Incubation", "24/7 Bio-response", "Elite Synthesis"],
    },
  ];

  return (
    <section id="membership" className="py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <span className="font-data text-accent text-[10px] md:text-xs tracking-widest uppercase mb-4 block">Access_Tiers</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter italic">Select your protocol.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "relative p-10 md:p-12 rounded-[3.5rem] border border-border bg-card/10 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] flex flex-col items-center text-center",
                plan.popular && "bg-accent/[0.03] border-accent/30 ring-1 ring-accent/20"
              )}
            >
              {plan.popular && (
                <div className="absolute top-6 px-4 py-1 rounded-full bg-accent text-[10px] font-data text-white font-bold uppercase tracking-widest">
                  Maximum Velocity
                </div>
              )}
              <div className="p-4 rounded-full bg-accent/10 text-accent mb-8">
                {plan.icon}
              </div>
              <h3 className="font-heading text-3xl font-bold mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-12">
                <span className="font-heading text-5xl font-bold italic">{plan.price}</span>
                <span className="font-sans text-foreground/40 text-sm">/ yr</span>
              </div>
              <ul className="space-y-4 mb-12 w-full">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-foreground/60">
                    <Check size={14} className="text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full">
                <MagneticButton variant={plan.popular ? "accent" : "secondary"} className="w-full">
                  Engage Protocol
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
