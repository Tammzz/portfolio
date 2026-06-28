import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { expertise } from "../data/expertise";
import { revealContainer, revealItem, viewportOnce } from "../lib/motion";
import SectionHeader from "./SectionHeader";
import styles from "./Expertise.module.css";

/** Core disciplines — grid of expertise cards mapped from data. */
export default function Expertise() {
  return (
    <section id="expertise" className="section">
      <motion.div
        className="container"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={revealItem}>
          <SectionHeader index="03" label="CORE_TELEMETRY" meta="WHAT I DO" />
        </motion.div>

        <motion.h2 className={`display ${styles.heading}`} variants={revealItem}>
          Core <span className="italic-pink">disciplines</span>
        </motion.h2>

        <div className={styles.grid}>
          {expertise.map((item, i) => (
            <motion.article
              key={item.code}
              className={styles.card}
              data-accent={i % 2 === 0 ? "pink" : "green"}
              variants={revealItem}
            >
              <div className={styles.cardTop}>
                <span className={`mono ${styles.code}`}>[{item.code}]</span>
                <Plus size={13} className={styles.plus} aria-hidden="true" />
              </div>
              <h3 className={`display ${styles.cardTitle}`}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <span className={styles.cardLine} aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
