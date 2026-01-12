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
  title: "IEEE - RUSB",
  description:
    "Institute of Electrical and Electronics Engineers - Rajshahi University Student Branch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <UserAuthProvider>
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
