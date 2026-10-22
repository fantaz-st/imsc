import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter, SiteHeader } from "./site-chrome";
import "./globals.css";

export const metadata = {
  title: "IMSC 2027 — International Maritime Science Conference",
  description: "Join the 12th International Maritime Science Conference in Split, Croatia in May 2027.",
  applicationName: "IMSC 2027",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

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
