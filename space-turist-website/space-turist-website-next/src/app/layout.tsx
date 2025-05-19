import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Space Turist",
  description: "this is a website exercise for practice with next.js, typescript and tailwind doing a website for a space travel agency",
  icons: {
    icon: "/space-turist-website-next/public/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
