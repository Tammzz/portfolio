import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects, additionalExperience } from "../data/projects";
import { highlight } from "../lib/highlight";
import { revealContainer, revealItem, viewportOnce } from "../lib/motion";
import SectionHeader from "./SectionHeader";
import ProjectVisual from "./ProjectVisual";
import styles from "./Projects.module.css";

/**
 * Selected deployments. Split layout: featured display (left) + interactive
 * terminal index (right). Clicking an index entry updates the featured area
 * via React state.
 */
export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <section id="work" className="section">
      <motion.div
        className="container"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={revealItem}>
          <SectionHeader
            index="02"
            label="FIELD_EXPERIENCE"
            meta={`QTY: 0${projects.length}`}
          />
        </motion.div>

        <motion.div className={styles.split} variants={revealItem}>
          {/* Featured */}
          <article className={styles.featured}>
            <ProjectVisual key={active.id} project={active} />

            <div className={styles.titleRow}>
              <div className={styles.titleGroup}>
                <span className={`mono mono-pink ${styles.num}`}>{active.id}</span>
                <h3 className={`display ${styles.title}`}>
                  {highlight(active.title, active.italicWord)}
                </h3>
              </div>
              <span className={styles.category}>{active.category}</span>
            </div>

            <p className={styles.desc}>{active.description}</p>

            <div className={styles.footer}>
              <div className={styles.tags}>
                {active.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <a className={styles.view} href={active.href}>
                VIEW SPEC{" "}
                <ArrowRight size={11} aria-hidden="true" />
              </a>
            </div>
          </article>

          {/* Index */}
          <div className={styles.indexCol}>
            <div className={styles.indexHead}>
              <span>// INDEX</span>
              <span>
                {active.id} / 0{projects.length}
              </span>
            </div>
            <ul className={styles.index}>
              {projects.map((project) => {
                const isActive = project.id === activeId;
                return (
                  <li key={project.id} className={styles.indexItem}>
                    <motion.button
                      type="button"
                      className={styles.indexBtn}
                      data-active={isActive}
                      aria-pressed={isActive}
                      aria-label={`View ${project.title}, ${project.company}, ${project.year}`}
                      onClick={() => setActiveId(project.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.32, 1] }}
                    >
                      <span className={styles.indexTop}>
                        <span className={styles.indexRef}>
                          <span className={styles.indexArrow} aria-hidden="true">
                            {isActive ? "▸" : " "}
                          </span>{" "}
                          {project.id} // {project.ref}
                        </span>
                        <span className={styles.indexYear}>{project.year}</span>
                      </span>
                      <span className={`display ${styles.indexTitle}`}>
                        {highlight(project.title, project.italicWord)}
                      </span>
                      <span className={styles.indexCompany}>{project.company}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        {/* Additional experience — compact list */}
        <motion.div className={styles.additional} variants={revealItem}>
          <div className={styles.additionalHead}>
            <span>// ADDITIONAL_EXPERIENCE</span>
            <span>QTY: 0{additionalExperience.length}</span>
          </div>
          <ul className={styles.additionalList}>
            {additionalExperience.map((item) => (
              <li key={item.org} className={styles.additionalItem}>
                <span className={styles.additionalRole}>{item.role}</span>
                <span className={styles.additionalOrg}>{item.org}</span>
                <span className={styles.additionalPeriod}>{item.period}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
