"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./Reveal";

const IMAGES = [
  { src: "/images/gallery-1.png", alt: "Dessert mit Sahne und Kiwi" },
  { src: "/images/gallery-2.png", alt: "Gericht mit Pommes frites" },
  { src: "/images/gallery-3.png", alt: "Backfisch mit Pommes und Remoulade" },
  { src: "/images/gallery-4.png", alt: "Salatteller mit Schinken" },
  { src: "/images/gallery-5.png", alt: "Hauptgericht mit Bratkartoffeln" },
  { src: "/images/gallery-6.png", alt: "Roastbeef mit Remoulade und Bratkartoffeln" },
  { src: "/images/gallery-7.png", alt: "Teller mit Garnelen und Avocado" },
  { src: "/images/gallery-8.png", alt: "Gericht mit Salatbeilage" },
  { src: "/images/gallery-9.png", alt: "Matjes mit Bratkartoffeln" },
];

export function Gallery() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-background px-6 py-16 sm:px-10 lg:px-[min(10.5vw,152px)]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {IMAGES.map((image, i) => (
          <motion.div
            key={image.src}
            className="group relative aspect-[3/4] overflow-clip sm:aspect-[385/510]"
            initial={{
              opacity: 0,
              y: reducedMotion ? 0 : 48,
              scale: reducedMotion ? 1 : 1.04,
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: (i % 3) * 0.12, ease: EASE }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
