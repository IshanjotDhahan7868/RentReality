import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RentReality",
  description: "Housing affordability clarity for young Canadians.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <header className="mb-6 flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-emerald-400/90" />
              <span className="text-lg font-semibold tracking-tight">
                RentReality
              </span>
            </div>
            <nav className="flex gap-4 text-sm text-slate-300">
              <a href="/" className="hover:text-emerald-400">
                Home
              </a>
              <a href="/explorer" className="hover:text-emerald-400">
                Explorer
              </a>
              <a href="/learn" className="hover:text-emerald-400">
                Learn
              </a>
              <a href="/about" className="hover:text-emerald-400">
                About
              </a>
            </nav>
          </header>

          <main className="pb-10">{children}</main>

          <footer className="border-t border-slate-800 pt-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} RentReality. Educational only, not financial advice.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
