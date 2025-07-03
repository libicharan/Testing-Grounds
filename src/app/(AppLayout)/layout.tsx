"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import StoreProvider from "../StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <StoreProvider>
        <PrimeReactProvider>
          <Header />
          {children}
        </PrimeReactProvider>
      </StoreProvider>
    </div>
  );
}
