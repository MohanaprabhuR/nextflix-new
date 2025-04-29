import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/header/header";
import { TanstackProvider } from "@/app/provider/tanstackProvider";

export const metadata: Metadata = {
  title: "Nextflix",
  description: "Nextflix is a movie streaming app built with Next.js and React",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body className=" pb-[64px] max-sm:pb-[40px]">
        <TanstackProvider>
          <Header />
          {children}
          {modal}
        </TanstackProvider>
      </body>
    </html>
  );
}
