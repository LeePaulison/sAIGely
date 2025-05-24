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
  title: 'Project-Sage',
  icons: {
    icon: 'assets/icons/favicon.ico',
    shortcut: 'assets/icons/favicon.ico',
    apple: 'assets/icons/apple-touch-icon.png',
  },
  description: 'A developer-focused GenAI MVP by Lee Paulison Jr',
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
