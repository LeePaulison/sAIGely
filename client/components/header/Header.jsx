// This is a client component
import { Heading } from '@radix-ui/themes';
// Components
import SignInButton from '@/components/signInButton';


export default function Header() {
  return (
    <header className="w-full px-4 py-3 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-slate-200 pb-3">
        {/* Logo / Title */}
        <a href="/" className="group transition-colors duration-200">
          <Heading
            as="h1"
            size="4"
            className="text-slate-700 group-hover:text-slate-900 group-hover:underline underline-offset-4 decoration-1"
          >
            sAIgely (Project-Sage)
          </Heading>
        </a>
        {/* Sign In Button */}
        <SignInButton />
      </div>
    </header>
  );
}
