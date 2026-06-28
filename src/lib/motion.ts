import type { Variants } from "framer-motion";

/**
 * Shared motion tokens. Keeps every section on the same rhythm and mirrors the
 * CSS design tokens in global.css (`--ease`, reveal distance/duration) so the
 * Framer Motion layer feels native to the existing aesthetic.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.tsx, so these variants don't need their own guards.
 */

/** Mirrors `--ease: cubic-bezier(0.16, 1, 0.32, 1)` from global.css. */
export const easeOut = [0.16, 1, 0.32, 1] as const;

/**
 * Parent variant: orchestrates children so they cascade in rather than
 * appearing as one block. Attach with `initial="hidden"` + `whileInView`/
 * `animate`, then give each child the matching item variant below.
 */
export const revealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.08,
    },
  },
};

/** Child variant: subtle fade + rise, matching the old `.reveal` feel. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Standalone fade+rise for elements that aren't part of a stagger group. */
export const fadeUp: Variants = revealItem;

/**
 * Nested container for rows that should reveal one-by-one as the section
 * scrolls in (e.g. the additional-experience list). Slightly tighter cadence
 * than the section-level `revealContainer` so the lines read like a list
 * printing out rather than a single block floating up.
 */
export const revealList: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

/**
 * Row variant for `revealList`. A more pronounced rise + a touch of horizontal
 * drift so each line clearly enters on its own rather than fading as a group.
 */
export const revealLine: Variants = {
  hidden: { opacity: 0, y: 16, x: -8 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/** Viewport config shared by scroll-triggered sections. Mirrors the old
 *  IntersectionObserver `rootMargin` and only fires once. */
export const viewportOnce = {
  once: true,
  margin: "0px 0px -12% 0px",
} as const;
