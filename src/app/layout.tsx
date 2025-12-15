"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/component/layout/HeadreWrapper";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider";
import UserInitialize from "@/component/layout/UserInitialize";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <UserInitialize />
            {/* <PageLoading /> */}
            <Toaster
              position="top-right"
              duration={3000}
              richColors
              closeButton
            />
            <div className="min-h-screen flex flex-col">
              <HeaderWrapper />
              <main className="flex-1">{children}</main>
            </div>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
