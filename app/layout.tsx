import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sofia & Lorenzo — 14 giugno 2027",
  description:
    "L’invito al matrimonio di Sofia e Lorenzo, a Villa del Balbianello sul Lago di Como.",
  openGraph: {
    title: "Sofia & Lorenzo — Ci sposiamo!",
    description: "14 giugno 2027 · Villa del Balbianello, Lago di Como",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofia & Lorenzo — Ci sposiamo!",
    description: "14 giugno 2027 · Villa del Balbianello, Lago di Como",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
