import { motion } from "framer-motion";
import { toolCategories } from "../data/tools";
import { revealContainer, revealItem, viewportOnce } from "../lib/motion";
import SectionHeader from "./SectionHeader";
import styles from "./TechStack.module.css";

/** Tech arsenal — compact bordered pills inside a bracketed panel. */
export default function TechStack() {
  return (
    <section id="stack" className="section">
      <motion.div
        className="container"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={revealItem}>
          <SectionHeader index="04" label="SYSTEM_STACK" meta="TOOLS OF THE TRADE" />
        </motion.div>

        <motion.h2 className={`display ${styles.heading}`} variants={revealItem}>
          Tech <span className="italic-pink">arsenal</span>
        </motion.h2>

        <motion.div className={styles.panel} variants={revealItem}>
          <span className="corner corner-tl" style={{ borderColor: "var(--border-strong)" }} />
          <span className="corner corner-tr" style={{ borderColor: "var(--border-strong)" }} />
          <span className="corner corner-bl" style={{ borderColor: "var(--border-strong)" }} />
          <span className="corner corner-br" style={{ borderColor: "var(--border-strong)" }} />

          {toolCategories.map((category) => (
            <motion.div
              key={category.label}
              className={styles.group}
              variants={revealItem}
            >
              <h3 className={styles.groupLabel}>{category.label}</h3>
              <motion.ul className={styles.pills} variants={revealContainer}>
                {category.tools.map((tool) => (
                  <motion.li key={tool.name} className={styles.pill} variants={revealItem}>
                    <span
                      className={styles.indicator}
                      data-priority={tool.priority}
                      aria-hidden="true"
                    />
                    {tool.name}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
