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
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://ieee-rusb.org"),
  title: {
    default: "IEEE - RUSB",
    template: "%s | IEEE - RUSB",
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

import { getUserFromCookie } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromCookie();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* @ts-ignore */}
        <UserAuthProvider initialUser={user}>
          <Navbar>{children}</Navbar>
          <Footer />
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
