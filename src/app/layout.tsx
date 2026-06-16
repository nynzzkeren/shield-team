import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleBackground from "@/components/ParticleBackground";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shield Team | Roblox Script Hub",
  description: "The most premium Roblox script hub with luxury features and strict security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${spaceGrotesk.className} antialiased selection:bg-primary/30`}>
        <LoadingScreen />
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
