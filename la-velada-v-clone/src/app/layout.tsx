import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Head from "next/head";



export const metadata: Metadata = {
  title: "Clon de La velada del Año V",
  description: "Clon de La velada del Año V de Ibai Llanos creada a partir de Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Clon de La velada del Año V de Ibai Llanos creada a partir de Next.js" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <body className="w-screen h-screen bg-[#f19fca] text-white">

        <Header />
        <main>
          {children}
        </main>
        <Footer />

      </body>
    </html>
  );
}
