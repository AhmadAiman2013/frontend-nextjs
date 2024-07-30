import type { Metadata } from "next";

import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/query-provider";
import Footer from "@/components/Layouts/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coret",
  description: "Catatan dan Coretan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.className} flex flex-col container sm:w-full h-screen bg-background text-foreground dark:bg-background dark:text-foreground antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
