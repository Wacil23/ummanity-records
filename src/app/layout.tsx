import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ummanity Records",
  description: "Created for you by you",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
