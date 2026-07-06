"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal, TextLineReveal, EASE } from "./Reveal";

const MAPS_URL = "https://maps.app.goo.gl/QCS14zLuomthtcN17";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoLargeY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const photoSmallY = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section
      id="ueber-uns"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      {/* Decorative stars */}
      <motion.div
        className="pointer-events-none absolute left-[47%] top-16 hidden h-10 w-10 lg:block"
        initial={{ opacity: 0, scale: 0, rotate: -60 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      >
        <Image src="/images/star-1.svg" alt="" fill />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[14%] left-[40%] hidden h-12 w-12 lg:block"
        initial={{ opacity: 0, scale: 0, rotate: 60 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
      >
        <Image src="/images/star-2.svg" alt="" fill />
      </motion.div>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,42%)_minmax(0,1fr)] lg:gap-20">
        {/* Text column */}
        <div className="flex flex-col items-start">
          <TextLineReveal
            as="h2"
            lines={["Willkommen", "auf der", "Schute"]}
            className="font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-foreground text-[clamp(36px,5vw,48px)]"
          />

          <Reveal delay={0.15} className="mt-10 max-w-[420px]">
            <p className="text-[16px] font-medium leading-[1.6] text-foreground/90">
              De Lübsche Schut ist das Restaurant auf der Trave in Lübeck. Wir
              bieten deutsche und mexikanische Küche – mit unserer Karte haben
              wir versucht, die ein oder andere Erinnerung zu wecken und das
              „Lübsche“ mit einfließen zu lassen.
            </p>
            <p className="mt-5 text-[16px] font-medium leading-[1.6] text-foreground/90">
              Mit unserem mexikanisch inspirierten Angebot erinnert sich
              vielleicht so mancher Gast an das Lokal „Cielito Lindo“ am Roten
              Löwen hier in Lübeck. Stefan Bünning, der damalige Betreiber und
              Koch des beliebten Lokals, ist jetzt bei uns an Bord. Bevor der
              gebürtige Hamburger nach Norddeutschland zurückkehrte, arbeitete
              er als Chefkoch in mehreren lateinamerikanischen Metropolen.
            </p>
          </Reveal>

          {/* Quote card */}
          <motion.figure
            className="relative mt-12 w-full max-w-[420px] bg-surface p-6 pb-10"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 48, scale: reducedMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
          >
            <motion.div
              className="absolute left-0 top-0 h-[43px] w-[61px]"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              <Image src="/images/quote-open.svg" alt="" fill />
            </motion.div>
            <motion.div
              className="absolute bottom-0 right-0 h-[43px] w-[61px] rotate-180"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            >
              <Image src="/images/quote-close.svg" alt="" fill />
            </motion.div>
            <blockquote
              className="relative font-serif text-[24px] leading-[1.3] text-white"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              Wir haben immer ein offenes Ohr für Euch und hoffen, ihr fühlt
              euch wohl bei uns.
            </blockquote>
            <figcaption className="relative mt-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-foreground/60">
              Euer Team von „De Lübsche Schut“
            </figcaption>
          </motion.figure>

          <Reveal delay={0.2} className="mt-10">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 font-semibold text-[16px] tracking-[-0.16px] text-foreground"
            >
              FINDET UNS AUF GOOGLE MAPS
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* Photo column */}
        <div className="relative">
          <motion.div
            className="relative aspect-[593/777] w-full max-w-[594px] overflow-clip lg:ml-auto"
            style={reducedMotion ? undefined : { y: photoLargeY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <Image
                src="/images/hero.png"
                alt="De Lübsche Schut – die Schute an der Lachswehrallee"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative -mt-16 mr-auto aspect-[487/303] w-[78%] max-w-[487px] overflow-clip shadow-2xl lg:absolute lg:-left-24 lg:bottom-6 lg:mt-0 lg:w-[68%]"
            style={reducedMotion ? undefined : { y: photoSmallY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            >
              <Image
                src="/images/about-2.png"
                alt="Illustration der Schute"
                fill
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
