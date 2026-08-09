import type { Metadata } from "next";
import localFont from "next/font/local";
import { Anton } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import { BackgroundProvider } from "@/components/BackgroundProvider";
import { YouTubePlayerProvider } from "@/components/YouTubePlayerProvider";
import { NEUTRAL_BG } from "@/data/categories";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "vibe radio",
  description: "One page, one playlist, one play button. Pick a room, hit play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased`}
      >
        <BackgroundProvider initialImage={NEUTRAL_BG}>
          <AnimatedBackground />
          <YouTubePlayerProvider>{children}</YouTubePlayerProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}
