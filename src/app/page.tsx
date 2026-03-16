"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Philosophy, Protocol } from "@/components/NarrativeSections";
import { Scrollytelling, Membership } from "@/components/DiagnosticSections";
import { XRayReveal } from "@/components/XRayReveal";
import { VaultNode3D } from "@/components/VaultNode3D";
import { GlobalNetwork } from "@/components/ThreeDSections";
import { Footer } from "@/components/Footer";

/**
 * Vapor Clinic Landing Page
 * Assembled using Preset D - "Vapor Clinic" (Neon Biotech)
 */
export default function Page() {
  return (
    <main className="theme-vapor-clinic relative bg-background text-foreground antialiased min-h-screen">
      <Navbar />
      
      <div id="hero">
        <Hero />
      </div>
      
      <Features />
      
      <Philosophy />
      
      <div id="diagnostics">
        <XRayReveal />
      </div>

      <Scrollytelling />

      <VaultNode3D />

      <GlobalNetwork />

      <Membership />

      <Footer />
    </main>
  );
}
