import { Geist, Geist_Mono, Old_Standard_TT } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oldStandardTT = Old_Standard_TT({
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "My Portfolio",
  description: "A showcase of my work and skills as a web developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${oldStandardTT.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
