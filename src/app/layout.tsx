import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/header";
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
      <body className="pt-[60px] pb-[84px]">
        <TanstackProvider>
          <Header />
          {children}
          {modal}
        </TanstackProvider>
      </body>
    </html>
  );
}
