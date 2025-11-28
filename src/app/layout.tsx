import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GOLFA COUTURE - Tissus & Vêtements pour Homme",
  description: "Découvrez nos collections de tissus premium et vêtements sur mesure pour homme. Qualité exceptionnelle et nouveaux articles régulièrement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <ClientBody className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </ClientBody>
    </html>
  );
}
