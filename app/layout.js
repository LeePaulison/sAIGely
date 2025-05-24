import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'Project-Sage',
    template: '%s | Project-Sage',
  },
  description: 'A developer-focused GenAI MVP by Lee Paulison Jr',
  keywords: 'GenAI, MVP, developer-focused, Lee Paulison Jr',
  authors: [{ name: 'Lee Paulison Jr', url: 'https://github.com/LeePaulison/project-sage' }],
  creator: 'Lee Paulison Jr',
  publisher: 'Lee Paulison Jr',
  viewport: 'width=device-width, initial-scale=1.0',
  colorScheme: 'light',
  themeColor: '#1f2937',
  robots: { index: true, follow: true },
  icons: {
    icon: '/assets/icons/favicon.ico',
    shortcut: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Project-Sage',
    description: 'A developer-focused GenAI MVP by Lee Paulison Jr',
    url: 'https://github.com/LeePaulison/project-sage',
    siteName: 'Project-Sage',
    images: [
      {
        url: 'https://github.com/LeePaulison/project-sage/raw/main/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Project-Sage',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://github.com/LeePaulison/project-sage',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
