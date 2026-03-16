"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-[2rem] border border-transparent text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 overflow-hidden transform-gpu will-change-transform hover:scale-[1.03] active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "text-primary-foreground border-primary",
        outline:
          "border-border bg-background hover:text-foreground text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:text-foreground text-foreground",
        destructive: "text-destructive",
        link: "text-primary underline-offset-4 hover:underline !bg-transparent !p-0 hover:-translate-y-[1px]",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-[1.5rem] px-4 text-xs",
        lg: "h-14 rounded-[2.5rem] px-8 text-base",
        icon: "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// We define specific background behaviors for the sliding animation based on variant
const getBackgroundLayerClasses = (variant?: string | null) => {
  switch (variant) {
    case "outline":
    case "ghost":
      return "bg-muted translate-y-[101%] group-hover/button:translate-y-0";
    case "default":
    default:
      return "bg-accent translate-y-[101%] group-hover/button:translate-y-0";
  }
};

const getDefaultBg = (variant?: string | null) => {
  if (variant === "default" || !variant) return "bg-primary";
  if (variant === "secondary") return "bg-secondary";
  return "bg-transparent";
};

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<React.ElementRef<typeof ButtonPrimitive>, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    
    // Pass custom cubic-bezier via inline style for precise match with GEMINI.md
    const magneticStyle = {
      transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.4s ease",
    };

    const bgLayerStyle = {
      transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.4s ease",
    };

    if (variant === "link") {
      return (
        <ButtonPrimitive
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          style={magneticStyle}
          {...props}
        >
          {children}
        </ButtonPrimitive>
      );
    }

    return (
      <ButtonPrimitive
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), getDefaultBg(variant))}
        style={magneticStyle}
        {...props}
      >
        {/* Sliding Background Layer */}
        <span 
          className={cn(
            "absolute inset-0 z-0 w-full h-full block rounded-inherit",
            getBackgroundLayerClasses(variant)
          )}
          style={bgLayerStyle}
        />
        
        {/* Content Layer — text flips dark on hover when accent bg slides in */}
        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover/button:text-primary">
          {children}
        </span>
      </ButtonPrimitive>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
