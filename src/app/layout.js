import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "11th IMSC",
  description: "International Maritime Science Conference",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
