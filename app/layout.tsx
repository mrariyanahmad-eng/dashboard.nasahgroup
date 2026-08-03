import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nasah Dashboard",
  description: "Manage your Nasah Group LTD account and apps.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
