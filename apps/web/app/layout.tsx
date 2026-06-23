import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "CampusOS TITAN X",
  description: "Unified AI-powered campus infrastructure platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} text-foreground bg-background relative min-h-screen flex flex-col font-sans`}>
        <div className="absolute inset-0 bg-grid -z-10 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
