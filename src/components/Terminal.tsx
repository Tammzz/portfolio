import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Terminal boot primitives for the hero status panel.
 *
 * Both components animate only once `start` is true and fire `onSettle` exactly
 * once when finished, so a parent can chain them into a sequence. Both honor the
 * user's reduced-motion preference: when set, they render the final text
 * immediately and settle on the next tick (no scramble / no typing).
 */

/** Glyph pool used while a character is still resolving. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>._-";
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

interface TextProps {
  text: string;
  /** Begin animating once true. */
  start: boolean;
  /** Fires once when the animation has fully settled. */
  onSettle?: () => void;
  className?: string;
}

/**
 * Reveals `text` left-to-right: each character cycles through random glyphs
 * before locking to its final value. Subtle, decode-style — no shaking.
 */
export function ScrambleText({ text, start, onSettle, className }: TextProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("");
  const settledRef = useRef(false);

  useEffect(() => {
    if (!start || settledRef.current) return;

    const settle = () => {
      settledRef.current = true;
      setDisplay(text);
      onSettle?.();
    };

    if (reduced) {
      settle();
      return;
    }

    // Stagger each character's lock-in across the total reveal; cycle glyphs on
    // a slower clock so the motion reads as "decoding", not chaotic flicker.
    const lead = 220; // ms before the first character locks in
    const perChar = 30; // ms between successive characters settling
    const total = lead + text.length * perChar;
    const cycle = 55; // ms between glyph swaps for unresolved characters
    const startedAt = performance.now();
    let raf = 0;
    let lastSwap = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const settledCount = Math.floor((elapsed - lead) / perChar);

      if (elapsed >= total) {
        settle();
        return;
      }

      // Only repaint random glyphs on the cycle clock to keep it calm.
      if (now - lastSwap >= cycle) {
        lastSwap = now;
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < settledCount || ch === " ") out += ch;
          else out += randomGlyph();
        }
        setDisplay(out);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, reduced, text, onSettle]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

/** Types `text` one character at a time, like a real terminal prompt. */
export function Typewriter({ text, start, onSettle, className }: TextProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const settledRef = useRef(false);

  useEffect(() => {
    if (!start || settledRef.current) return;

    const settle = () => {
      settledRef.current = true;
      setCount(text.length);
      onSettle?.();
    };

    if (reduced) {
      settle();
      return;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        window.clearInterval(id);
        settledRef.current = true;
        onSettle?.();
      }
    }, 45);

    return () => window.clearInterval(id);
  }, [start, reduced, text, onSettle]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
    </span>
  );
}
