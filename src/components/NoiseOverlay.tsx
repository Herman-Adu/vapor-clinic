"use client";

import React from "react";

/**
 * NoiseOverlay
 * Applies a global grain texture using an SVG filter.
 * Required by fixed design system at 0.05 opacity.
 */
export const NoiseOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05]">
      <svg className="h-full w-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};
