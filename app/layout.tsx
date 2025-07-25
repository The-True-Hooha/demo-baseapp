import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL;
  const frameUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  return {
    title: "Base DeFi Portfolio Tracker",
    description: "Track your DeFi positions on Base with MiniKit",
    openGraph: {
      title: "Base DeFi Portfolio Tracker",
      description: "Track your DeFi positions on Base with real-time data",
      images: [`${frameUrl}/og-image.jpg`],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${frameUrl}/og-image.jpg`,
        button: {
          title: "📊 Track Portfolio",
          action: {
            type: "launch_frame",
            name: "Base DeFi Portfolio",
            url: frameUrl,
            splashImageUrl: `${frameUrl}/splash.jpg`,
            splashBackgroundColor: "#1e1b4b",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
