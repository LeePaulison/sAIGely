// Radix UI
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
// Components
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function Home() {
  return (
    <Theme>
      <div className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
        <Header />
        <main className='flex-grow flex items-center justify-center text-gray-400 italic'>
          Your chat interface will appear here.
        </main>
        <Footer />
      </div>
    </Theme>
  );
}
