"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  readonly className?: string;
  readonly onReset?: () => void;
}

const navLinks = [
  { href: "/", label: "Calculadora", icon: "calculate" },
  { href: "/shop", label: "Loja", icon: "storefront", disabled: true },
];

export const Header: React.FC<HeaderProps> = ({ className = "", onReset }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between border-b border-border-dark bg-background-dark/95 backdrop-blur-md px-4 lg:px-20 py-3 lg:py-4 ${className}`}
    >
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          onClick={() => onReset?.()}
          className="flex items-center gap-2 lg:gap-3 text-primary hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-2xl lg:text-3xl font-bold">
            bolt
          </span>
          <h2 className="text-lg lg:text-xl font-bold tracking-tighter uppercase italic">
            Fortnite XP
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-2 lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-disabled={link.disabled}
                tabIndex={link.disabled ? -1 : undefined}
                className={`flex items-center gap-1.5 text-xs lg:text-sm font-bold tracking-widest hover:text-primary transition-colors uppercase px-3 py-2 rounded-md ${link.disabled ? "pointer-events-none opacity-50 grayscale" : ""} ${
                  isActive
                    ? "text-primary bg-primary/10 border-b-2 border-primary"
                    : "text-slate-400"
                }`}
              >
                <span className="material-symbols-outlined text-sm lg:text-base">
                  {link.icon}
                </span>
                <span>{link.label}</span>
                {link.disabled && (
                  <span className="ml-1 text-[9px] bg-border-dark px-1.5 py-0.5 rounded text-slate-300">
                    Em breve
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-card-dark border-b border-border-dark p-4 shadow-2xl md:hidden flex flex-col gap-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.disabled) e.preventDefault();
                  else setIsMobileMenuOpen(false);
                }}
                aria-disabled={link.disabled}
                tabIndex={link.disabled ? -1 : undefined}
                className={`flex items-center justify-between text-sm font-bold tracking-widest uppercase px-4 py-4 rounded-xl transition-colors ${link.disabled ? "pointer-events-none opacity-50 grayscale" : ""} ${
                  isActive
                    ? "text-primary bg-primary/10 border border-primary"
                    : "text-slate-400 hover:text-white hover:bg-background-dark"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                {link.disabled && (
                  <span className="text-[10px] bg-border-dark px-2 py-1 rounded text-slate-300">
                    Em breve
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
