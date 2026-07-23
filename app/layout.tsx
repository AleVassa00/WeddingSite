import type { Metadata } from "next";
import { weddingConfig } from "@/src/config/wedding.config";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/eb-garamond";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
  openGraph: {
    title: weddingConfig.seo.socialTitle,
    description: weddingConfig.seo.socialDescription,
    type: "website",
    ...(weddingConfig.seo.socialImage
      ? { images: [weddingConfig.seo.socialImage] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: weddingConfig.seo.socialTitle,
    description: weddingConfig.seo.socialDescription,
    ...(weddingConfig.seo.socialImage
      ? { images: [weddingConfig.seo.socialImage] }
      : {}),
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
