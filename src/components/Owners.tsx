"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Reveal, TextLineReveal, EASE } from "./Reveal";
import type { HomeData } from "@/lib/content";

type Owner = HomeData["owners"]["people"][number];

function Portrait({
  owner,
  y,
  delay,
  imageSizes,
  className,
}: {
  owner: Owner;
  y: MotionValue<number>;
  delay: number;
  imageSizes: string;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.figure className={className} style={{ y }}>
      {/* bg-colored ring keeps the medallions cleanly separated if the
          parallax ever lets them kiss */}
      <div className="relative aspect-square overflow-clip rounded-full ring-8 ring-background">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reducedMotion ? 1 : 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay, ease: EASE }}
        >
          <Image
            src={owner.image.src}
            alt={owner.image.alt}
            fill
            sizes={imageSizes}
            className="object-cover"
          />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-white/10"
        />
      </div>
      <Reveal delay={delay + 0.15} y={24}>
        <figcaption className="mt-5 sm:mt-6">
          <span
            className="block font-serif text-[clamp(19px,2.2vw,28px)] leading-[1.15] text-white"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            {owner.name}
          </span>
          <span className="mt-1.5 block text-[12px] font-semibold uppercase tracking-[0.04em] text-foreground/60 lg:text-[13px]">
            {owner.role}
          </span>
        </figcaption>
      </Reveal>
    </motion.figure>
  );
}

export function Owners({ owners }: { owners: HomeData["owners"] }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Keep the motion values bound even under reduced motion (zeroed range):
  // unbinding the style leaves a stale initial transform on the element.
  const portraitAY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, -40]);
  const portraitBY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [90, -90]);

  return (
    <section
      id="wer-wir-sind"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      {/* Decorative stars */}
      <motion.div
        className="pointer-events-none absolute right-[9%] top-20 hidden size-10 lg:block"
        initial={{ opacity: 0, scale: 0, rotate: -60 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      >
        <Image src="/images/star-1.svg" alt="" fill />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[10%] left-[5%] hidden size-9 lg:block"
        initial={{ opacity: 0, scale: 0, rotate: 60 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
      >
        <Image src="/images/star-2.svg" alt="" fill />
      </motion.div>

      <TextLineReveal
        as="h2"
        lines={owners.heading}
        className="font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-foreground text-[clamp(36px,5vw,48px)]"
      />

      <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)] lg:gap-20">
        {/* Portrait medallions */}
        <div className="grid grid-cols-2 gap-x-5 sm:gap-x-8 lg:block">
          <Portrait
            owner={owners.people[0]}
            y={portraitAY}
            delay={0}
            imageSizes="(max-width: 1024px) 44vw, 26vw"
            className="lg:w-[56%]"
          />
          <Portrait
            owner={owners.people[1]}
            y={portraitBY}
            delay={0.15}
            imageSizes="(max-width: 1024px) 44vw, 23vw"
            className="relative z-10 mt-12 sm:mt-16 lg:-mt-24 lg:ml-auto lg:w-[50%]"
          />
        </div>

        {/* Story */}
        <div className="flex max-w-[460px] flex-col items-start">
          <Reveal delay={0.1}>
            <p className="text-pretty text-[16px] font-medium leading-[1.6] text-foreground/90">
              {owners.intro}
            </p>
          </Reveal>

          {/* Pull quote */}
          <Reveal delay={0.15} className="relative mt-10 lg:mt-12">
            <motion.div
              aria-hidden
              className="absolute -left-2 -top-7 h-[64px] w-[90px]"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              <Image src="/images/quote-open.svg" alt="" fill />
            </motion.div>
            <p
              className="relative font-serif text-[clamp(24px,2.4vw,33px)] leading-[1.3] text-white"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {owners.pullquote.before}{" "}
              <span className="text-accent">{owners.pullquote.accent}</span>{" "}
              {owners.pullquote.after}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 lg:mt-12">
            {owners.paragraphs.map((text, i) => (
              <p
                key={i}
                className={`text-pretty text-[16px] font-medium leading-[1.6] text-foreground/90 ${
                  i > 0 ? "mt-5" : ""
                }`}
              >
                {text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.25} className="mt-9">
            <a
              href="#kontakt"
              className="group inline-flex min-h-11 items-center gap-3 font-semibold text-[16px] tracking-[-0.16px] text-foreground"
            >
              {owners.ctaLabel}
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
