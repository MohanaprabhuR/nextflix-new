import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/header";
import { TanstackProvider } from "@/app/provider/tanstackProvider";
import { ShowProvider } from "@/components/context/showContext";

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
      <body className="pt-[60px] pb-[64px]">
        <TanstackProvider>
          <ShowProvider>
            <Header />
            {children}
            {modal}
          </ShowProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
