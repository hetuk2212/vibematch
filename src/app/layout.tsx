import type { Metadata } from "next";
import localFont from "next/font/local";
import { Anton } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import { BackgroundProvider } from "@/components/BackgroundProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { YouTubePlayerProvider } from "@/components/YouTubePlayerProvider";
import { NEUTRAL_BG } from "@/data/categories";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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

const description =
  "Vibematch — background music rooms. Pick a category, hit play, that's it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Pick a Room, Hit Play`,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} — Pick a Room, Hit Play`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Pick a Room, Hit Play`,
    description,
  },
  // Paste the content value from Google Search Console's HTML tag verification
  // method into GOOGLE_SITE_VERIFICATION in .env.local (see .env.local.example).
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
        <GoogleAnalytics />
        <BackgroundProvider initialImage={NEUTRAL_BG}>
          <AnimatedBackground />
          <YouTubePlayerProvider>{children}</YouTubePlayerProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}
