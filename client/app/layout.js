import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// Providers
import Providers from '@/client/providers/providers';
// Components
import Header from '@/client/components/header/Header';
import Footer from '@/client/components/footer/Footer';

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
  robots: { index: true, follow: true },
  icons: {
    icon: '/assets/icons/favicon.ico',
    shortcut: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
  colorScheme: 'light',
  themeColor: '#1f2937',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center w-svw h-svh border-red-700'>
            <Header />
            <main className='flex items-center justify-center h-full w-full text-gray-400 italic'>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
