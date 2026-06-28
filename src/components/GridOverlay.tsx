import styles from "./GridOverlay.module.css";

/**
 * Fixed grid overlay across the viewport (desktop only). Five columns render
 * six faint vertical lines that sit behind content. Foreground layouts snap
 * their edges to these lines. Purely decorative.
 */
export default function GridOverlay() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.grid}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={styles.col} />
        ))}
      </div>
    </div>
  );
}
