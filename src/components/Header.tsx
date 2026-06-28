import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { navLinks } from "../data/nav";
import { easeOut } from "../lib/motion";
import styles from "./Header.module.css";

function useClock() {
  const [time, setTime] = useState(() => formatCet());
  useEffect(() => {
    const id = setInterval(() => setTime(formatCet()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function formatCet() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Oslo",
  }).format(new Date());
}

/**
 * Fixed header: logo, live status indicator, anchor nav. Gains a backdrop +
 * border once the page is scrolled, with a thin pink scroll-progress line that
 * fits the "transmission" motif.
 */
export default function Header() {
  const time = useClock();
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      className={styles.header}
      data-scrolled={scrolled}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <a className={styles.logo} href="#top">
        [<span className="mono-pink">/</span>] TAMARA.AWADH
      </a>

      <div className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        <span>SYS.ACTIVE</span>
        <span className={styles.sep}>//</span>
        <span aria-label={`Local time ${time} CET`}>{time} CET</span>
      </div>

      <nav className={styles.nav} aria-label="Primary">
        {navLinks.map((link) => (
          <motion.a
            key={link.href}
            className={styles.link}
            href={link.href}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2, ease: easeOut }}
          >
            [{link.index}] {link.label}
          </motion.a>
        ))}
      </nav>

      <motion.span
        className={styles.progress}
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
    </motion.header>
  );
}
