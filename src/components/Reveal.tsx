"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 1,
  once = true,
  amount = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger },
  }),
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  amount = 0.2,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 32,
  duration = 0.9,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  const reducedMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

export function TextLineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reducedMotion = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // whileInView must observe the untransformed wrapper: the inner span's
        // own initial translate would push it out of the viewport and the
        // reveal would never trigger.
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: reducedMotion ? { opacity: 0 } : { y: "110%" },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 1, delay: delay + i * 0.12, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
