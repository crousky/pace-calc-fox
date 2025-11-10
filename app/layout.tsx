import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Running Pace Calculator",
  description: "Calculate pace, distance, or time for your running races",
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
