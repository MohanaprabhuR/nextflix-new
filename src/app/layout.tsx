import type { Metadata } from "next";
import Header from "./header";
import { TanstackProvider } from "@/app/provider/tanstackProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nextflix",
  description: "Nextflix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pb-20">
        <TanstackProvider>
          <Header />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
