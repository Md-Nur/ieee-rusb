import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, Bounce } from "react-toastify";
import UserAuthProvider from "@/provider/UserAuthProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_URL?.startsWith("http") 
      ? process.env.NEXT_PUBLIC_URL 
      : `http://${process.env.NEXT_PUBLIC_URL}`) || "https://ieee-rusb.org"
  ),
  title: {
    default: "IEEE RUSB",
    template: "%s | IEEE RUSB",
  },
  description: "Institute of Electrical and Electronics Engineers - Rajshahi University Student Branch",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "IEEE - RUSB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

import ProgressBar from "@/components/Nav/ProgressBar";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {/* @ts-ignore */}
        <UserAuthProvider>
          <Navbar>
            <main className="animate-page-fade">
              {children}
            </main>
            <Footer />
          </Navbar>
        </UserAuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
