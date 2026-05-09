import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/sidebar";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CAPITALISSUES | Financial Intelligence Terminal",
  description: "Real-time market intelligence, sentiment analysis, and research for institutional investors. Professional-grade financial terminal.",
  keywords: ["financial terminal", "market data", "trading platform", "institutional research", "real-time analytics"],
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} font-mono antialiased`}>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
