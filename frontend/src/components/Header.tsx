"use client";

export default function Header() {
  return (
    <header className="border-b border-[#2a2a2b] bg-[#1a1a1b]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#48D0FF] to-[#26A8C8] flex items-center justify-center animate-pulse-glow">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#121213]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-[#F2F3F4] tracking-tight">
                Library Hall
              </h1>
              <p className="text-xs sm:text-sm text-[#48D0FF] font-medium">
                LOCUS 2025
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#48D0FF]/10 border border-[#48D0FF]/30 text-[#48D0FF] text-xs font-semibold">
              Booking System
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

