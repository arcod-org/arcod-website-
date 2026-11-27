import type { Metadata } from "next";
// Fonts are self-hosted from npm (no runtime or build-time call to Google Fonts).
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcod.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ARCOD — Association for Rural Community Development", template: "%s · ARCOD" },
  description:
    "Since 1988, ARCOD has worked alongside farmers, women, children and marginalised families in rural Tamil Nadu — in agriculture, education, health and livelihoods.",
  openGraph: { type: "website", siteName: "ARCOD", locale: "en_IN", images: ["/images/hero-campus.jpg"] },
  icons: { icon: "/images/logo-tree.jpg", apple: "/images/logo-tree.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
