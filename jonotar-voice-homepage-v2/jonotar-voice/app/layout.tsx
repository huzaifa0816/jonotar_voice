import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "সাধারণ মানুষের কথা",
  description: "আপনার কথা, আপনার ভোট, আপনার মতামত।",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
