import React from "react";
import { cn } from "@/lib/utils";

const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
);

export const SectionSkeleton = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={cn("relative overflow-hidden bg-card/5 rounded-[3rem] border border-white/5", className)}>
    <Shimmer />
    {children}
  </div>
);

export const FeatureSkeleton = () => (
  <section className="py-24 px-6 md:px-24 bg-background">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {[1, 2, 3].map((i) => (
        <SectionSkeleton key={i} className="h-[400px]" />
      ))}
    </div>
  </section>
);

export const XRaySkeleton = () => (
  <section className="h-screen w-full bg-background flex items-center justify-center px-12">
    <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="hidden lg:block w-1/4 space-y-4">
        <div className="h-4 w-3/4 bg-white/5 rounded-full overflow-hidden relative"><Shimmer /></div>
        <div className="h-4 w-1/2 bg-white/5 rounded-full overflow-hidden relative"><Shimmer /></div>
      </div>
      <SectionSkeleton className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-full" />
      <div className="hidden lg:block w-1/4 space-y-4">
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden relative"><Shimmer /></div>
        <div className="h-4 w-2/3 bg-white/5 rounded-full overflow-hidden relative"><Shimmer /></div>
      </div>
    </div>
  </section>
);

export const VaultSkeleton = () => (
  <section className="h-screen w-full bg-background flex flex-col items-center justify-center px-6">
    <div className="relative w-full max-w-4xl flex flex-col lg:flex-row items-center justify-between gap-8">
       <div className="w-full lg:w-1/3 space-y-4">
          <div className="h-8 w-2/3 bg-white/5 rounded-lg overflow-hidden relative"><Shimmer /></div>
          <div className="h-4 w-full bg-white/5 rounded-lg overflow-hidden relative"><Shimmer /></div>
       </div>
       <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/5 flex items-center justify-center overflow-hidden">
         <div className="w-full h-full animate-pulse bg-white/[0.02]" />
         <Shimmer />
       </div>
       <div className="w-full lg:w-1/3 space-y-4 text-right">
          <div className="h-12 w-1/2 bg-white/5 rounded-lg overflow-hidden relative ml-auto"><Shimmer /></div>
          <div className="h-4 w-2/3 bg-white/5 rounded-lg overflow-hidden relative ml-auto"><Shimmer /></div>
       </div>
    </div>
  </section>
);

export const GlobeSkeleton = () => (
  <section className="h-screen w-full bg-background grid grid-cols-1 lg:grid-cols-2">
    <div className="p-12 flex items-center justify-center">
      <div className="w-80 h-80 rounded-full border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-white/[0.02]" />
        <Shimmer />
      </div>
    </div>
    <div className="p-12 flex flex-col justify-center space-y-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="h-4 w-24 bg-white/5 rounded-full overflow-hidden relative"><Shimmer /></div>
          <div className="h-12 w-48 bg-white/5 rounded-xl overflow-hidden relative"><Shimmer /></div>
        </div>
      ))}
    </div>
  </section>
);
