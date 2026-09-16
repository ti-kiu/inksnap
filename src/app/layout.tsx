import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inksnap.ai"),
  title: {
    default: "InkSnap — AI Tattoo Generator | Virtual Tattoo Try On & Stencil Maker",
    template: "%s | InkSnap",
  },
  description:
    "See how a tattoo looks on your body before you commit. InkSnap uses AI to simulate tattoos on your photo, generate stencils, and design cover-ups. Try it free.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "InkSnap",
    title: "InkSnap — AI Tattoo Generator | Virtual Tattoo Try On & Stencil Maker",
    description:
      "See how a tattoo looks on your body before you commit. InkSnap uses AI to simulate tattoos on your photo, generate stencils, and design cover-ups. Try it free.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="bg-cream text-charcoal min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
