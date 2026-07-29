import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '@/components/providers/ToastProvider';
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

import ChatbotWidget from '@/components/ChatbotWidget';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased font-sans`}
    >
      <body className="h-full w-full">
        {children}
        <ToastProvider />
        <ChatbotWidget />
      </body>
    </html>
  );
}
