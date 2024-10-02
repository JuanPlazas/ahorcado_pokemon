import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cual es ese pokemom",
  description: "Juego del ahorcado by JuanPlazas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <link href="https://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet" />
        {children}
      </body>
    </html>
  );
}
