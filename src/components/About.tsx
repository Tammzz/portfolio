import { motion } from "framer-motion";
import { aboutParagraphs, aboutStats } from "../data/about";
import { revealContainer, revealItem, viewportOnce } from "../lib/motion";
import SectionHeader from "./SectionHeader";
import styles from "./About.module.css";

/**
 * Profile / about section. Split layout: editorial bio (left) + a bracketed
 * "spec sheet" of runtime stats (right) to keep the systems aesthetic.
 */
export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        className="container"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={revealItem}>
          <SectionHeader index="01" label="PROFILE" meta="WHO I AM" />
        </motion.div>

        <motion.div className={styles.split} variants={revealItem}>
          {/* Narrative */}
          <div className={styles.bio}>
            <h2 className={`display ${styles.heading}`}>
              Currently figuring out how to{" "} 
              make the <span className="italic-pink">web</span> feel less <span className="italic-green">boring</span>.
            </h2>

            {aboutParagraphs.map((text, i) => (
              <p key={i} className={styles.para}>
                {text}
              </p>
            ))}

            <div className={styles.status}>
              <div className="signal" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
              <span className={styles.statusText}>
                CURRENTLY — available for work
              </span>
            </div>
          </div>

          {/* Spec sheet */}
          <aside className={styles.specs}>
            <span className="corner corner-tl" style={{ borderColor: "var(--border-strong)" }} />
            <span className="corner corner-tr" style={{ borderColor: "var(--border-strong)" }} />
            <span className="corner corner-bl" style={{ borderColor: "var(--border-strong)" }} />
            <span className="corner corner-br" style={{ borderColor: "var(--border-strong)" }} />

            <div className={styles.specHead}>
              <span>// SPEC</span>
              <span>REV.2026</span>
            </div>

            <dl className={styles.specList}>
              {aboutStats.map((stat) => (
                <div key={stat.label} className={styles.specRow}>
                  <dt className={styles.specKey}>{stat.label}</dt>
                  <dd className={styles.specVal}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </motion.div>
      </motion.div>
    </section>
  );
}
