import Link from "next/link";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col">
      <header className="py-6 px-4 md:px-8 bg-white border-b border-gray-100 flex justify-center">
        <Link href="/">
          <span className="font-bold text-2xl text-[#0B3C5D] tracking-tight">Aurvyz</span>
        </Link>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="py-8 text-center text-gray-500 text-sm bg-white border-t border-gray-100">
        &copy; {new Date().getFullYear()} Aurvyz AI. All rights reserved.
      </footer>
    </div>
  );
}
