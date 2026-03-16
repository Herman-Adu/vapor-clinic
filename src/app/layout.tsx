import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Outfit,
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Inter,
  Playfair_Display,
  JetBrains_Mono,
  Space_Grotesk,
  DM_Serif_Display,
  Space_Mono,
  Sora,
  Instrument_Serif,
  Fira_Code,
} from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Preset A
const plusJakartaSans = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const cormorantGaramond = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"] });
const ibmPlexMono = IBM_Plex_Mono({ variable: "--font-ibm-plex", subsets: ["latin"], weight: ["400", "500"] });

// Preset B
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], style: ["normal", "italic"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

// Preset C
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const dmSerifDisplay = DM_Serif_Display({ variable: "--font-dm-serif", subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });

// Preset D
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });
const firaCode = Fira_Code({ variable: "--font-fira-code", subsets: ["latin"] });

const allFontsVariableClass = `
  ${plusJakartaSans.variable} ${outfit.variable} ${cormorantGaramond.variable} ${ibmPlexMono.variable}
  ${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}
  ${spaceGrotesk.variable} ${dmSerifDisplay.variable} ${spaceMono.variable}
  ${sora.variable} ${instrumentSerif.variable} ${firaCode.variable}
`.replace(/\s+/g, ' ').trim();

export const metadata: Metadata = {
  title: "Cinematic Landing Page Builder",
  description: "1:1 Pixel Perfect High-Fidelity Landing Pages",
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
