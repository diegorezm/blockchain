import type {Metadata} from "next";
import {Inter} from 'next/font/google'

import {Toaster} from 'react-hot-toast'

import "./globals.css";
import {Bell} from "lucide-react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Cryptobank",
  description: "This is app is for my final school project",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <Toaster toastOptions={{
          duration: 3000,
          blank: {
            icon: <Bell className="w-5 h-5" />,
          },
          position: "bottom-right",
          style: {
            background: "var(--foreground)",
            color: "var(--background)"
          },
          error: {
            style: {
              background: "var(--red-foreground)",
              color: "var(--background)"
            }
          },
          success: {
            style: {
              background: "var(--green-foreground)",
              color: "var(--background)"
            }
          }
        }} />
      </body>
    </html>
  );
}
