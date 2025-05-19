import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Space Turist",
  description: "this is a website exercise for practice with next.js, typescript and tailwind doing a website for a space travel agency",
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
        {children}
      </body>
    </html>
  );
}
