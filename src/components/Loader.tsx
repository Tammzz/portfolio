import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easeOut } from "../lib/motion";
import styles from "./Loader.module.css";

/** How long the simulated boot takes to fill from 0 → 100%. */
const DURATION = 1700;

/**
 * Boot overlay shown on top while the hero mounts underneath. Runs an eased
 * progress bar to 100%, then blinks out and signals completion via onComplete.
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Eased 0 → 100 progress driven by requestAnimationFrame.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      // On finish: a single smooth fade revealing the settled hero beneath.
      animate={{ opacity: done ? 0 : 1 }}
      transition={done ? { duration: 0.6, ease: easeOut } : { duration: 0 }}
      onAnimationComplete={() => {
        if (done) onComplete();
      }}
    >
      <div className={styles.brand}>
        [<span className="mono-pink">/</span>] TAMARA.AWADH
      </div>

      <div className={styles.track} aria-hidden="true">
        <motion.span className={styles.fill} style={{ width: `${progress}%` }} />
      </div>

      <div
        className={styles.meta}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label="Loading portfolio"
      >
        <span>LOADING_ASSETS</span>
        <span className={styles.count}>{String(progress).padStart(3, "0")}%</span>
      </div>
    </motion.div>
  );
}
