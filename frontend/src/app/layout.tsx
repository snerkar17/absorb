import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Absorb",
  description: "Write it. Tag it. Map it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
