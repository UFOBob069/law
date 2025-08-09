import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Injured in an Accident? Get the Help You Deserve—Fast | Central Texas Hurt",
    template: "%s | Central Texas Hurt"
  },
  description:
    "Injured in a car accident, slip and fall, or workplace accident in Central Texas? Local personal injury lawyers serving Austin, Waco, San Marcos, Round Rock, Georgetown, Cedar Park, Kyle, Buda, and New Braunfels. Free consultation. No win, no fee. Call 512-543-7777.",
  keywords: [
    "personal injury lawyer",
    "personal injury attorney",
    "car accident lawyer",
    "slip and fall lawyer",
    "workplace injury lawyer",
    "Central Texas injury attorney",
    "Austin personal injury",
    "Waco injury lawyer",
    "San Marcos accident attorney",
    "Round Rock personal injury",
    "Georgetown personal injury",
    "Cedar Park injury lawyer",
    "Kyle injury lawyer",
    "Buda injury lawyer",
    "New Braunfels injury lawyer",
    "no win no fee",
    "free consultation",
    "24/7 response",
    "millions recovered",
    "injury compensation",
    "accident claims"
  ],
  authors: [{ name: "Central Texas Hurt" }],
  creator: "Central Texas Hurt",
  publisher: "Central Texas Hurt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://centraltexashurt.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Injured in an Accident? Get the Help You Deserve—Fast',
    description:
      'Local personal injury lawyers serving Central Texas. Free consultation. No win, no fee. Call 512-543-7777.',
    url: 'https://centraltexashurt.com',
    siteName: 'Central Texas Hurt',
    images: [
      {
        url: '/hero-roof.jpg',
        width: 1200,
        height: 630,
        alt: 'Central Texas Hurt — Personal Injury Lawyers in Central Texas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Injured in an Accident? Get the Help You Deserve—Fast',
    description:
      'Local personal injury lawyers serving Central Texas. Free consultation. No win, no fee. Call 512-543-7777.',
    images: ['/hero-roof.jpg'],
    creator: '@CentralTexasHurt',
    site: '@CentralTexasHurt',
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
    icon: [{ url: '/favicon.ico' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  category: 'legal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <meta name="theme-color" content="#DC2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#DC2626" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
