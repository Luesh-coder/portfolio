"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { RESUME_URL } from "../lib/constants";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-paper/[0.12] bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6 md:px-[52px]">
        <a
          href="#top"
          className="text-[15px] font-medium tracking-[0.24em] text-paper no-underline"
        >
          LV
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-[30px] text-[12px] font-semibold uppercase tracking-[0.16em] md:flex">
          {NAV_ITEMS.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              className="text-paper/[0.66] no-underline transition-colors hover:text-glow"
            >
              {name}
            </a>
          ))}
          <a
            href="docs/Lucio Ruben Villena Resume.pdf"
            download
            className="inline-flex items-center gap-[7px] bg-brand px-[15px] py-[9px] text-[12px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-brand-hover"
          >
            Résumé ↓
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-paper md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-1 border-t-2 border-paper/[0.12] bg-ink/95 px-6 py-4 backdrop-blur-md md:hidden">
          {NAV_ITEMS.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-paper/[0.66] no-underline transition-colors hover:text-glow"
            >
              {name}
            </a>
          ))}
          <a
            href={RESUME_URL}
            download
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-fit items-center gap-[7px] bg-brand px-[15px] py-[9px] text-[12px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-brand-hover"
          >
            Résumé ↓
          </a>
        </div>
      )}
    </nav>
  );
};
