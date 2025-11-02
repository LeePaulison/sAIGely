import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <footer className="w-full mt-6 py-3 px-4 text-sm text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-200 pt-3">
        {/* Left: Branding */}
        <div className="text-center sm:text-left">
          <p className="font-medium text-slate-700">© {new Date().getFullYear()} sAIgely (Project-Sage)</p>
          <p className="text-xs text-slate-400">A developer-focused GenAI MVP by Lee Paulison Jr</p>
        </div>

        {/* Center: Tech info and version */}
        <div className="text-center hidden md:block">
          <p className="text-slate-500">
            Built with Next.js, Tailwind CSS, GraphQL, PostgreSQL, MongoDB, and OpenAI API
          </p>
          <p className="text-xs text-slate-400">v1.0.0</p>
        </div>

        {/* Right: Social + Legal */}
        <div className="flex justify-center sm:justify-end items-center gap-4">
          <a
            href="https://github.com/LeePaulison"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-slate-700"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/lee-paulison-jr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-slate-700"
          >
            <LinkedInLogoIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
