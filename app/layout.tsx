import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CredStack",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563EB",
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
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
            },
          }}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
