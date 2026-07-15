"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { EASE } from "./Reveal";
import { navLinks } from "./nav-links";
import type { SiteData } from "@/lib/content";

export function MobileNav({ site }: { site: SiteData }) {
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = navLinks(site);
  // The pill brand is two lines by design — last word drops to line 2.
  const words = site.name.trim().split(/\s+/);
  const brandLines =
    words.length > 1 ? [words.slice(0, -1).join(" "), words[words.length - 1]] : words;

  // Unlock synchronously so an anchor link's default jump isn't swallowed by
  // the still-locked scroller (the effect cleanup below runs too late).
  const closeMenu = () => {
    lenis?.start();
    document.documentElement.style.overflow = "";
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, lenis]);

  return (
    <>
      {/* Floating pill — fixed above everything, mobile/tablet only */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)_+_1rem)] z-50 flex justify-center px-4 xl:hidden">
        <motion.nav
          aria-label="Navigation"
          className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-foreground/10 bg-background/85 p-2 pl-5 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-md"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
        >
          <a
            href="#"
            onClick={closeMenu}
            className="font-semibold uppercase text-[11px] leading-[1.15] tracking-[-0.11px] text-foreground"
          >
            {brandLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              className="block h-[2px] w-6 bg-foreground"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-[2px] w-6 bg-foreground"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>

          <motion.a
            href={site.phoneHref}
            className="flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-accent px-5 font-semibold text-[13px] uppercase tracking-[-0.13px] text-background"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Reservieren
          </motion.a>
        </motion.nav>
      </div>

      {/* Full-screen menu overlay — sits under the pill so it stays operable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="py-2 font-semibold text-[20px] tracking-[-0.2px] text-foreground"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
