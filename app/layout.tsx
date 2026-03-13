import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CredStack — AI Grant & Tax Credit Finder",
  description:
    "Discover grants, tax credits, and funding opportunities your small business qualifies for. CredStack uses AI to match you with free money you're leaving on the table.",
  keywords: [
    "grants",
    "tax credits",
    "small business",
    "R&D tax credit",
    "SBA grants",
    "minority business grants",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
