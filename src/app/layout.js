import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import { SiteFooter, SiteHeader } from "./site-chrome";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "IMSC 2027 — International Maritime Science Conference",
  description: "Join the 12th International Maritime Science Conference in Split, Croatia in May 2027.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interTight.variable} ${ibmPlexMono.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
