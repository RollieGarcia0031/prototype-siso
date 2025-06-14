import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {appDescription, appName} from "@/util/constants";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: appName,
  description: appDescription,
};

export default function RootLayout({ children, noLayout }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
