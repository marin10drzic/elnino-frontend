"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: t("menu"), href: "#speisekarte" },
    { label: t("about"), href: "#about" },
    { label: t("reservations"), href: "#reservations" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0908]/90 backdrop-blur-md border-b border-amber-900/20">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-[0.25em] text-amber-400">
          EL NIGO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-xs tracking-[0.25em] text-stone-300 hover:text-amber-400 transition-colors duration-200"
            >
              {label.toUpperCase()}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#reservations"
            className="inline-flex items-center px-5 py-2.5 border border-amber-500/70 text-amber-400 text-xs tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all duration-200"
          >
            {t("reserve").toUpperCase()}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#0d0b09] border-t border-amber-900/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.25em] text-stone-300 hover:text-amber-400 transition-colors"
            >
              {label.toUpperCase()}
            </a>
          ))}
          <a
            href="#reservations"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center px-5 py-3 border border-amber-500/70 text-amber-400 text-xs tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all"
          >
            {t("reserve").toUpperCase()}
          </a>
        </div>
      )}
    </header>
  );
}
