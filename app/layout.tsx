import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pace Calculator - Synthwave Runner",
  description: "Calculate your running pace, distance, or time with a synthwave aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
