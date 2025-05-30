/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Space Turist",
  description: "this is a website exercise for practice with next.js, typescript and tailwind doing a website for a space travel agency",
  icons: {
    icon: "/shared/logo.svg",
  },


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Bellefair&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&display=swap');
        </style>
      </head>
      <body className="bg-[url(../../public/home/background-home-mobile.jpg)] bg-cover bg-no-repeat bg-center  items-center justify-between sm:bg-[url(../../public/home/background-home-tablet.jpg)] md:bg-[url(../../public/home/background-home-desktop.jpg)] ">
        <Header />
        {children}
      </body>
    </html>
  );

}
