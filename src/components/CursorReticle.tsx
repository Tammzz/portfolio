import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styles from "./CursorReticle.module.css";

/** Things that should trigger the reticle's "lock-on" state. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]';

/**
 * Custom arrowhead cursor — fits the secure-terminal aesthetic.
 * A filled green caret tracks the pointer exactly (its tip is the hotspot)
 * and brightens / tucks in when hovering interactive elements.
 * Self-disables on touch / coarse-pointer devices and under reduced motion.
 */
export default function CursorReticle() {
  // Exact pointer position (drives the arrowhead).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-reticle-on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setLocked(!!target?.closest(INTERACTIVE));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("cursor-reticle-on");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const state = [
    styles.root,
    visible && styles.visible,
    locked && styles.locked,
    pressed && styles.pressed,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={state} aria-hidden="true">
      {/* Open EQUILATERAL triangle pointing right (all 60° angles), tilted a
          touch, with a line parallel to its lower-right edge offset outward.
          Top vertex (6,4) is the hotspot and sits on the true pointer. */}
      <motion.div className={styles.dot} style={{ x, y }}>
        <svg className={styles.arrow} viewBox="0 0 24 28" aria-hidden="true">
          <g transform="rotate(7 6 4)">
            <path className={styles.head} d="M6 4 L20.7 12.5 L6 21 Z" />
            <path className={styles.tail} d="M19.3 19.1 L12.4 23.1" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
