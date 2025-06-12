import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Get Your Free 1-Minute Roof Quote — No Calls Required | 1MinRoofQuote",
    template: "%s | 1MinRoofQuote"
  },
  description: "Get an instant, AI-powered roof quote in just 60 seconds. No phone calls required. Connect with trusted local roofers and get your free estimate today.",
  keywords: [
    "roof quote",
    "roofing estimate",
    "instant roof quote",
    "AI roof quote",
    "free roof estimate",
    "roof replacement cost",
    "roof repair quote",
    "local roofers",
    "roofing calculator",
    "roof cost estimate"
  ],
  authors: [{ name: "1MinRoofQuote" }],
  creator: "1MinRoofQuote",
  publisher: "1MinRoofQuote",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://1minroofquote.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Get Your Free 1-Minute Roof Quote — No Calls Required',
    description: 'Get an instant, AI-powered roof quote in just 60 seconds. No phone calls required. Connect with trusted local roofers and get your free estimate today.',
    url: 'https://1minroofquote.com',
    siteName: '1MinRoofQuote',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '1MinRoofQuote - Instant AI-Powered Roof Quotes',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Your Free 1-Minute Roof Quote — No Calls Required',
    description: 'Get an instant, AI-powered roof quote in just 60 seconds. No phone calls required. Connect with trusted local roofers.',
    images: ['/twitter-image.jpg'],
    creator: '@1MinRoofQuote',
    site: '@1MinRoofQuote',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#1E40AF', // Blue color matching our theme
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <meta name="theme-color" content="#1E40AF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1E40AF" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
