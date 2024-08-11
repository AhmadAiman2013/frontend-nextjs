import type { Metadata } from "next";

import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/query-provider";
import Footer from "@/components/Layouts/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { BoardStoreProvider } from "@/utils/board-store-provider";

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
        className={`${robotoMono.className} flex flex-col min-h-screen mx-auto sm:w-full absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#000022_1px,transparent_1px),linear-gradient(to_bottom,#000022_1px,transparent_1px)] bg-[size:6rem_4rem] antialiased`}
      >
        <Providers>
          <BoardStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Footer />
            </ThemeProvider>
          </BoardStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
