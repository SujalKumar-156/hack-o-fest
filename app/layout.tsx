import type { Metadata } from "next";
import { Anton, Bangers, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/ui/Nav";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HACK-O-FEST // Assemble. Build. Conquer.",
  description:
    "A cinematic hackathon for builders, dreamers, and chaos engineers. Enter the multiverse of code.",
  openGraph: {
    title: "HACK-O-FEST // Assemble. Build. Conquer.",
    description: "A cinematic hackathon. Enter the multiverse of code.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bangers.variable} ${grotesk.variable}`}
    >
      <body className="bg-void text-cream font-body antialiased">
        <Preloader />
        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
