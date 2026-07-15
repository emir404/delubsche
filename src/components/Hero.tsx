"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Wordmark } from "./Wordmark";
import { EASE } from "./Reveal";
import { navLinks } from "./nav-links";
import type { HomeData } from "@/lib/content";
import type { SiteData } from "@/lib/content";

export function Hero({ hero, site }: { hero: HomeData["hero"]; site: SiteData }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const links = navLinks(site);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const infoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[560px] flex-col overflow-clip bg-background"
    >
      {/* Background photo with dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { scale: photoScale }}
        initial={reducedMotion ? { opacity: 0 } : { scale: 1.08, opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(19,24,32,0.8)]" />
      </motion.div>

      {/* Nav — desktop only; mobile gets the floating MobileNav pill */}
      <motion.header
        className="relative z-20 hidden items-center justify-between px-6 pt-8 sm:px-10 xl:flex lg:px-[min(10.5vw,152px)] lg:pt-14"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE }}
      >
        <a
          href="#"
          className="font-semibold uppercase text-[16px] tracking-[-0.16px] leading-[1.3] text-foreground"
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="py-2 font-semibold text-[16px] tracking-[-0.16px] leading-[1.3] text-foreground transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <motion.a
          href={site.phoneHref}
          className="hidden h-[42px] items-center justify-center bg-accent px-6 font-semibold text-[16px] uppercase tracking-[-0.16px] text-background xl:flex"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {hero.reserveLabel}
        </motion.a>
      </motion.header>

      {/* Giant wordmark */}
      <div className="relative z-0 flex flex-1 items-center justify-center px-6">
        <motion.div
          className="w-[min(88vw,718px)] text-accent"
          style={
            reducedMotion
              ? undefined
              : { scale: wordmarkScale, opacity: wordmarkOpacity, y: wordmarkY }
          }
        >
          <Wordmark className="h-auto w-full" delay={0.35} />
        </motion.div>
      </div>

      {/* Bottom info row */}
      <motion.div
        className="relative z-10 flex flex-col gap-2 px-6 pb-24 font-semibold text-[13px] tracking-[-0.13px] leading-[1.3] text-foreground sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:text-[16px] sm:tracking-[-0.16px] lg:px-[min(10.5vw,152px)] lg:pb-[96px] xl:pb-[80px]"
        style={reducedMotion ? undefined : { opacity: infoOpacity }}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: EASE }}
      >
        {hero.columns.map((text, i) => (
          // The middle column is the address — uppercased in the design
          // regardless of how it is written in the admin.
          <p key={i} className={i === 1 ? "uppercase" : undefined}>
            {text}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
