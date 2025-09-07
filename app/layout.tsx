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
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://funder.vercel.app';
  return {
    title: "Funder - Support Your Favorite Creators",
    description:
      "A decentralized platform for content creators to receive direct funding from their supporters. Built on Base with MiniKit for fast, secure, and low-cost transactions.",
    keywords: ["crypto", "blockchain", "creator economy", "funding", "Base", "Ethereum", "Web3", "content creators"],
    authors: [{ name: "Funder Team" }],
    creator: "Funder",
    publisher: "Funder",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: "Funder - Support Your Favorite Creators",
      description: "A decentralized platform for content creators to receive direct funding from their supporters. Built on Base with MiniKit.",
      url: '/',
      siteName: 'Funder',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Funder - Support Your Favorite Creators',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Funder - Support Your Favorite Creators",
      description: "A decentralized platform for content creators to receive direct funding from their supporters. Built on Base with MiniKit.",
      images: ['/og-image.png'],
      creator: '@funder',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
        button: {
          title: "Launch Funder",
          action: {
            type: "launch_frame",
            name: "Funder",
            url: baseUrl,
            splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE,
            splashBackgroundColor:
              process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
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
