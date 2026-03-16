import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { 
  FeatureSkeleton, 
  XRaySkeleton, 
  VaultSkeleton, 
  GlobeSkeleton 
} from "@/components/SkeletonComponents";

// Dynamic Imports for Client-Side Interactive Components
const Features = dynamic(() => import("@/components/Features").then(mod => mod.Features), {
  loading: () => <FeatureSkeleton />
});

const Philosophy = dynamic(() => import("@/components/NarrativeSections").then(mod => mod.Philosophy));

const XRayReveal = dynamic(() => import("@/components/XRayReveal").then(mod => mod.XRayReveal), {
  loading: () => <XRaySkeleton />
});

const Scrollytelling = dynamic(() => import("@/components/DiagnosticSections").then(mod => mod.Scrollytelling));

const VaultNode3D = dynamic(() => import("@/components/VaultNode3D").then(mod => mod.VaultNode3D), {
  loading: () => <VaultSkeleton />
});

const GlobalNetwork = dynamic(() => import("@/components/ThreeDSections").then(mod => mod.GlobalNetwork), {
  loading: () => <GlobeSkeleton />
});

const Membership = dynamic(() => import("@/components/DiagnosticSections").then(mod => mod.Membership));

/**
 * Vapor Clinic Landing Page
 * Now a Server Component for optimal performance and SEO.
 */
export default function Page() {
  return (
    <main className="theme-vapor-clinic relative bg-background text-foreground antialiased min-h-screen">
      <Navbar />
      
      <div id="hero">
        <Hero />
      </div>
      
      <Suspense fallback={<FeatureSkeleton />}>
        <Features />
      </Suspense>
      
      <Philosophy />
      
      <div id="diagnostics">
        <Suspense fallback={<XRaySkeleton />}>
          <XRayReveal />
        </Suspense>
      </div>

      <Scrollytelling />

      <Suspense fallback={<VaultSkeleton />}>
        <VaultNode3D />
      </Suspense>

      <Suspense fallback={<GlobeSkeleton />}>
        <GlobalNetwork />
      </Suspense>

      <Membership />

      <Footer />
    </main>
  );
}
