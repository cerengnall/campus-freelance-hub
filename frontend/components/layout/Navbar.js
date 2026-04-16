"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Dashboard", href: "#" },
  { label: "Jobs", href: "#" },
  { label: "Profile", href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <header className="navbar sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <a
          href="#"
          className="brand shrink-0 text-lg font-semibold tracking-tight text-slate-900 transition hover:text-slate-700"
        >
          Campus Hub
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLoggedIn((v) => !v)}
            className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-slate-200/80 bg-white md:hidden">
            <div className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn((v) => !v);
                  setMenuOpen(false);
                }}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        )}
      </header>

      <style jsx>{`
        @media (max-width: 767px) {
          .navbar .brand {
            max-width: calc(100vw - 110px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      `}</style>
    </>
  );
}
