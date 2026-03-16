import React from "react";

/**
 * Footer - "The Operational Terminal"
 * Deep dark background, rounded tops, system status.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-background rounded-t-[4rem] px-8 md:px-24 py-24 text-foreground overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 border-b border-white/10 pb-24">
          <div className="md:col-span-2">
            <div className="font-heading text-4xl font-bold tracking-tighter mb-6">
              Vapor <span className="text-accent italic">Clinic</span>
            </div>
            <p className="font-sans text-sm text-foreground/40 max-w-sm leading-relaxed mb-8">
              The next phase of human evolution is not biological. It is synthetic. join the protocol and bypass legacy limitations.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="font-data text-[10px] uppercase tracking-widest text-foreground/60">
                System Operational // All Nodes Synchronized
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-data text-[10px] uppercase tracking-[0.2em] text-accent mb-8">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm text-foreground/40">
              <li><a href="#hero" className="hover:text-foreground transition-colors">Foundation</a></li>
              <li><a href="#protocol" className="hover:text-foreground transition-colors">Protocol</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Artifacts</a></li>
              <li><a href="#membership" className="hover:text-foreground transition-colors">Engage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-data text-[10px] uppercase tracking-[0.2em] text-accent mb-8">Legal</h4>
            <ul className="space-y-4 font-sans text-sm text-foreground/40">
              <li><a href="#" className="hover:text-foreground transition-colors">Data Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Genomic Ethics</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Encryption Protocol</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-data text-[9px] uppercase tracking-widest text-foreground/20">
            © 2026 VAPOR_CLINIC_BIOSYNTHESIS // CORE_SYSTEM_v4.2.1
          </p>
          <div className="flex gap-8 font-data text-[9px] uppercase tracking-widest text-foreground/20">
            <a href="#" className="hover:text-accent transition-colors">X_Protocol</a>
            <a href="#" className="hover:text-accent transition-colors">Terminals</a>
            <a href="#" className="hover:text-accent transition-colors">Synapse</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
