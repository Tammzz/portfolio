import type { Project } from "../data/types";
import styles from "./ProjectVisual.module.css";

interface Props {
  project: Project;
}

/**
 * Schematic / blueprint-style visual for the featured project. Pure SVG +
 * CSS — faint grid, infrastructure nodes, connection lines, crosshair, corner
 * markers, and status labels. Decorative, so the diagram is aria-hidden while
 * the status text remains as real labels.
 */
export default function ProjectVisual({ project }: Props) {
  // Deterministic node layout seeded from the ref code so each project
  // renders a slightly different schematic.
  const seed = project.ref.charCodeAt(3) + project.ref.charCodeAt(4);
  const shift = (seed % 5) * 18;

  return (
    <div className={styles.frame}>
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      <div className={styles.canvas}>
        {/* Center crosshair */}
        <div className={styles.crosshair} aria-hidden="true">
          <span className={styles.crossH} />
          <span className={styles.crossV} />
        </div>

        {/* Corner markers */}
        <span className={`${styles.marker} ${styles.markerTl}`} aria-hidden="true" />
        <span className={`${styles.marker} ${styles.markerBr}`} aria-hidden="true" />

        <svg
          className={styles.svg}
          viewBox="0 0 800 500"
          fill="none"
          aria-hidden="true"
        >
          {/* Faint grid */}
          {Array.from({ length: 21 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 40}
              y1={0}
              x2={i * 40}
              y2={500}
              className={styles.grid}
            />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 40}
              x2={800}
              y2={i * 40}
              className={styles.grid}
            />
          ))}

          {/* Primary node */}
          <circle cx={200 + shift} cy="200" r="60" className={styles.ringPink} />
          <circle cx={200 + shift} cy="200" r="100" className={styles.ring} />

          {/* Connections + infrastructure rectangles */}
          <line
            x1={200 + shift}
            y1="200"
            x2="560"
            y2="320"
            className={styles.link}
          />
          <line
            x1={200 + shift}
            y1="200"
            x2="160"
            y2="405"
            className={styles.link}
          />
          <rect x="540" y="290" width="80" height="60" className={styles.nodeGreen} />
          <rect x="100" y="380" width="120" height="50" className={styles.node} />
          <circle cx="580" cy="320" r="4" className={styles.dotPink} />
        </svg>

        {/* Status labels */}
        <div className={styles.ref}>
          REF: {project.ref} // {project.year}
        </div>
        <div className={styles.active}>· [ ACTIVE ] ·</div>
      </div>
    </div>
  );
}
