"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Reveal, Stagger, StaggerItem, TextLineReveal, EASE } from "./Reveal";
import ConsentEmbed from "./ConsentEmbed";
import type { HomeData, HoursRow, SiteData } from "@/lib/content";

/** Current weekday + minutes in the restaurant's timezone (Europe/Berlin). */
function berlinNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    get("weekday"),
  );
  return {
    day: dayIndex,
    minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10),
  };
}

function useOpenState(hours: HoursRow[]) {
  const [state, setState] = useState<{ day: number; isOpen: boolean } | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      const { day, minutes } = berlinNow();
      const range = hours.find((row) => row.dayIndex === day)?.open ?? null;
      setState({
        day,
        isOpen: range !== null && minutes >= range[0] && minutes < range[1],
      });
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [hours]);

  return state;
}

export function Contact({
  contact,
  site,
}: {
  contact: HomeData["contact"];
  site: SiteData;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const openState = useOpenState(site.hours);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section
      id="kontakt"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[140px]"
    >
      {/* Ghost heading */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute -right-[2vw] top-8 select-none font-semibold uppercase leading-none tracking-[-0.02em] text-transparent text-[clamp(120px,22vw,340px)]"
        style={{
          WebkitTextStroke: "1.5px rgba(245,247,251,0.08)",
          y: reducedMotion ? 0 : ghostY,
        }}
      >
        Kontakt
      </motion.p>

      <div className="relative">
        <TextLineReveal
          as="h2"
          lines={contact.heading}
          className="font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-foreground text-[clamp(36px,5vw,48px)]"
        />

        {/* Giant dial-to-reserve headline */}
        <div className="mt-16 lg:mt-24">
          <Reveal y={24}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/50 sm:text-[14px]">
              {contact.reserveEyebrow}
            </p>
          </Reveal>
          <motion.span
            className="mt-3 block overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.a
              href={site.phoneHref}
              className="group block w-fit max-w-full"
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { y: "105%" },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 1.1, delay: 0.1, ease: EASE },
                },
              }}
            >
              <span
                className="block whitespace-nowrap font-serif leading-[1.05] text-foreground transition-colors duration-500 group-hover:text-accent text-[clamp(44px,9vw,130px)]"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                {site.phoneDisplay}
              </span>
              <span
                aria-hidden
                className="mt-2 block h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </motion.a>
          </motion.span>

          <Stagger
            className="mt-8 flex flex-col gap-x-10 gap-y-3 text-[15px] font-medium text-foreground/70 sm:flex-row sm:items-center sm:text-[16px]"
            stagger={0.1}
          >
            <StaggerItem y={16}>
              <a
                href={`mailto:${site.email}`}
                className="inline-block min-h-11 py-2 text-foreground transition-opacity hover:opacity-70 sm:min-h-0 sm:py-0"
              >
                {site.email}
              </a>
            </StaggerItem>
            <StaggerItem y={16}>
              <span className="hidden text-foreground/30 sm:inline" aria-hidden>
                ·
              </span>
            </StaggerItem>
            <StaggerItem y={16}>
              <span>{`${site.street}, ${site.city}`}</span>
            </StaggerItem>
            {contact.infoItems.map((text) => (
              <Fragment key={text}>
                <StaggerItem y={16}>
                  <span className="hidden text-foreground/30 sm:inline" aria-hidden>
                    ·
                  </span>
                </StaggerItem>
                <StaggerItem y={16}>
                  <span>{text}</span>
                </StaggerItem>
              </Fragment>
            ))}
          </Stagger>
        </div>

        {/* Departure-board opening hours */}
        <div id="oeffnungszeiten" className="mt-20 lg:mt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal>
              <h3 className="font-semibold uppercase text-[20px] tracking-[0.08em] text-foreground">
                {contact.hoursHeading}
              </h3>
            </Reveal>
            {openState && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`flex items-center gap-2.5 border px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] ${
                  openState.isOpen
                    ? "border-accent/40 text-accent"
                    : "border-foreground/20 text-foreground/50"
                }`}
              >
                <span
                  aria-hidden
                  className={`inline-block h-2 w-2 rounded-full ${
                    openState.isOpen ? "animate-pulse bg-accent" : "bg-foreground/40"
                  }`}
                />
                {openState.isOpen ? "Jetzt geöffnet" : "Derzeit geschlossen"}
              </motion.p>
            )}
          </div>

          <div className="mt-8 [perspective:900px]">
            {site.hours.map((row, i) => {
              const { day, time } = row;
              const isToday = openState?.day === row.dayIndex;
              const isClosed = row.open === null;
              return (
                <motion.div
                  key={day}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotateX: -70, y: 24 }
                  }
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                  className={`relative flex items-baseline justify-between gap-4 border-b border-foreground/10 px-4 py-4 [transform-origin:top] sm:px-6 ${
                    isToday ? "bg-surface" : ""
                  }`}
                >
                  {isToday && (
                    <motion.span
                      aria-hidden
                      className="absolute bottom-0 left-0 top-0 w-1 bg-accent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="flex items-baseline gap-3 text-[16px] font-semibold uppercase tracking-[0.1em] text-foreground">
                    {day}
                    {isToday && (
                      <span className="text-[11px] font-semibold tracking-[0.16em] text-accent">
                        Heute
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-[16px] font-medium tabular-nums tracking-[0.06em] ${
                      isClosed ? "text-foreground/40" : "text-foreground/90"
                    }`}
                  >
                    {time}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <Reveal delay={0.2} className="mt-6">
            <p className="text-[14px] font-medium text-foreground/60">
              {site.hoursNote}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Map with floating card */}
      <div className="relative mt-16 lg:mt-24">
        <Reveal y={60} amount={0.15}>
          {/* Google Maps only loads after an explicit click — before that no
              request (and no IP) reaches Google. Art. 6 Abs. 1 lit. a DSGVO
              + § 25 TDDDG. */}
          <div className="relative aspect-[4/3] w-full overflow-clip sm:aspect-[16/9] lg:aspect-[21/9]">
            <ConsentEmbed
              service="Google Maps"
              serviceId="google-maps"
              src={site.mapsEmbedSrc}
              privacyUrl="https://policies.google.com/privacy"
              previewImage="/images/map-preview.svg"
              title={`${site.name} auf Google Maps – ${site.street}, ${site.city}`}
              className="absolute inset-0"
              iframeClassName="grayscale-[0.3] contrast-[0.95]"
            />
          </div>
        </Reveal>

        <motion.div
          className="relative -mt-8 ml-4 mr-4 border-l-4 border-accent bg-surface p-6 shadow-2xl sm:absolute sm:bottom-8 sm:left-8 sm:ml-0 sm:mr-0 sm:mt-0 sm:max-w-[360px]"
          initial={{
            opacity: 0,
            y: reducedMotion ? 0 : 60,
            x: reducedMotion ? 0 : -24,
          }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.2 }}
        >
          <p className="font-semibold uppercase text-[16px] tracking-[-0.16px] text-foreground">
            {site.name}
          </p>
          <p className="mt-2 text-[15px] font-medium leading-[1.6] text-foreground/80">
            {site.street}
            <br />
            {site.city}
          </p>
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.1em] text-accent sm:min-h-0"
          >
            {contact.mapCtaLabel}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
