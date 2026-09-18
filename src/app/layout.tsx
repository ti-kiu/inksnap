import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://inkpreview.co"),
  title: {
    default: "Tattoo Simulator & Try On — Preview Before You Ink | InkPreview",
    template: "%s | InkPreview",
  },
  description:
    "See how a tattoo looks on your body before you commit. InkPreview uses AI to simulate tattoos on your photo and generate stencils. Try free.",
  verification: {
    google: "i7fPIZZ9FlnioMl6eaSWYwFFZgYeQzEQ993B7qfqi38",
    other: { "msvalidate.01": "8D5AE51845CFE08F58F54A68CFF76D57" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "InkPreview",
    title: "InkPreview — Tattoo Simulator & Try On",
    description: "See how a tattoo looks on your body before you commit. Try it free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNPRS6PVD5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VNPRS6PVD5');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yjsi7owcj6");
          `}
        </Script>
      </head>
      <body className="bg-cream text-charcoal min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}