"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Wordmark } from "./Wordmark";
import type { SiteData } from "@/lib/content";

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function VelocityMarquee({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();
  // The strip repeats seamlessly, so the visible text needs its own trailing
  // separator — the admin value is written without one.
  const marquee = `${text} · `;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    let moveBy = direction.current * -1.5 * (delta / 1000);
    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;
    moveBy += moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="border-y border-foreground/10 py-5 sm:py-7">
      <p className="sr-only">{text}</p>
      <div aria-hidden className="overflow-hidden whitespace-nowrap">
        <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="shrink-0 font-semibold uppercase leading-none tracking-[-0.02em] text-foreground text-[clamp(28px,5vw,56px)]"
            >
              {marquee}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function Footer({
  site,
  curtain = true,
}: {
  site: SiteData;
  curtain?: boolean;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // The wordmark finale plays once the marquee sentinel has entered (or been
  // scrolled past) the viewport — a plain in-view check misses instant jumps
  // to the page bottom.
  const [wordmarkPlay, setWordmarkPlay] = useState(false);

  // The curtain reveal only works when the whole footer fits in the viewport;
  // otherwise its top (contact/legal links) would be unreachable.
  const [fitsViewport, setFitsViewport] = useState(true);

  useEffect(() => {
    const check = () => {
      setFitsViewport(
        (footerRef.current?.offsetHeight ?? 0) <= window.innerHeight,
      );
      const sentinel = sentinelRef.current;
      if (sentinel && sentinel.getBoundingClientRect().top < window.innerHeight) {
        setWordmarkPlay(true);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const sticky = curtain && fitsViewport;

  return (
    <>
      {/* Marquee strip — stays in the dark page flow, also acts as the
          curtain sentinel that triggers the wordmark finale */}
      {curtain && (
        <div ref={sentinelRef} className="relative z-10 bg-background">
          <VelocityMarquee text={site.marquee} />
        </div>
      )}

      <footer
        ref={footerRef}
        className={`bg-accent text-background ${
          sticky ? "sticky bottom-0 z-0 motion-reduce:static" : ""
        }`}
      >
        <div className="px-6 pt-10 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div>
              <p className="font-semibold uppercase text-[16px] tracking-[-0.16px]">
                {site.name}
              </p>
              <p className="mt-2 text-[14px] font-medium leading-[1.6] text-background/70">
                {site.tagline}
                <br />
                {`${site.street}, ${site.city}`}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-[14px] font-semibold">
              <a
                href={site.phoneHref}
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-1"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-1"
              >
                {site.email}
              </a>
            </div>

            <div className="flex flex-col gap-1 text-[14px] font-semibold">
              <Link
                href="/impressum"
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-1"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-1"
              >
                Datenschutz
              </Link>
            </div>
          </div>

          <p className="mt-8 text-[13px] font-semibold text-background/60 lg:mt-10">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>

        {/* Giant wordmark finale — same content width as every other section.
            On the home page (curtain) the floating MobileNav pill needs
            clearance below xl. */}
        <div
          className={`px-6 pt-6 sm:px-10 lg:px-[min(10.5vw,152px)] ${
            curtain ? "pb-24 xl:pb-8" : "pb-5 lg:pb-8"
          }`}
        >
          <Wordmark
            className="h-auto w-full text-background"
            delay={0.15}
            play={curtain ? wordmarkPlay : undefined}
          />
        </div>
      </footer>
    </>
  );
}
