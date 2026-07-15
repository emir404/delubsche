"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./Reveal";
import type { HomeData } from "@/lib/content";

export function Gallery({ gallery }: { gallery: HomeData["gallery"] }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-background px-6 py-16 sm:px-10 lg:px-[min(10.5vw,152px)]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {gallery.images.map((image, i) => (
          <motion.div
            key={`${image.src}-${i}`}
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
