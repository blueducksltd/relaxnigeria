import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SoundProvider } from "@/contexts/SoundContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const laybar = localFont({
  src: "../fonts/laybar.ttf",
  variable: "--font-laybar",
});

export const metadata: Metadata = {
  title: "RTIFN - Relax Tinubu Is Fixing Nigeria",
  description: "Relax Tinubu Is Fixing Nigeria (RTIFN) is a grassroots group advancing the Renewed Hope Agenda, mobilizing communities to champion the vision of President Bola Ahmed Tinubu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${laybar.variable}`}>
      <body>
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
