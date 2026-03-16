import type { Metadata } from "next";
import {
  Sora,
  Instrument_Serif,
  Fira_Code,
} from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Vapor Clinic Brand Fonts
const sora = Sora({ 
  variable: "--font-sora", 
  subsets: ["latin"],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({ 
  variable: "--font-instrument", 
  subsets: ["latin"], 
  weight: ["400"], 
  style: ["normal", "italic"],
  display: 'swap',
});

const firaCode = Fira_Code({ 
  variable: "--font-fira-code", 
  subsets: ["latin"],
  display: 'swap',
});

const allFontsVariableClass = `${sora.variable} ${instrumentSerif.variable} ${firaCode.variable}`;

export const metadata: Metadata = {
  title: "Vapor Clinic – Premium Biological Synthesis",
  description: "Architecting customized neural pathways and bio-digital enhancements through decentralized vault nodes.",
  keywords: ["Biotech", "Neural Synthesis", "Genomic Audit", "Vapor Clinic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFontsVariableClass} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <NoiseOverlay />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
