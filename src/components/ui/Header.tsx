"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useBag } from "@/context/BagContext";

export default function Header() {
  const { totalCount, toggleDrawer } = useBag();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-nav select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-sm font-heading tracking-widest text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors uppercase"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-heading tracking-widest text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors uppercase"
            >
              Catalog
            </Link>
          </nav>

          {/* Brand Logo */}
          <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link href="/" className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-heading font-semibold tracking-[0.3em] text-neutral-950 dark:text-white transition-colors">
                TODI CREATION
              </span>
              <span className="text-[9px] font-heading tracking-[0.45em] text-primary uppercase -mt-0.5">
                Surat
              </span>
            </Link>
          </div>

          {/* Icons Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/catalog"
              className="p-2 rounded-full text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Shopping/Inquiry Bag Trigger */}
            <button
              onClick={toggleDrawer}
              className="relative p-2 rounded-full text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors active-press cursor-pointer"
              aria-label="Inquiry bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white shadow-glow">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 dark:border-neutral-900 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-heading font-medium tracking-wide text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors uppercase"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-heading font-medium tracking-wide text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors uppercase"
          >
            Catalog
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              toggleDrawer();
            }}
            className="w-full text-left block px-3 py-2 text-base font-heading font-medium tracking-wide text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors uppercase cursor-pointer"
          >
            Inquiry Bag ({totalCount})
          </button>
        </div>
      )}
    </header>
  );
}
