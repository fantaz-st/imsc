import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { metadata } from "./settings/metadata";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-variable.ttf",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
