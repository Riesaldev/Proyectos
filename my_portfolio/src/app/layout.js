import { Geist, Geist_Mono, Old_Standard_TT } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oldEnglish = Old_Standard_TT({
  variable: "--font-old-english",
  subsets: ["latin"],
  weight: ["700"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${oldEnglish.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
