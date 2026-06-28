import styles from "./GridOverlay.module.css";

/**
 * Fixed grid overlay across the viewport (desktop only). Two faint vertical
 * lines mark the left and right edges of the content column (the same outer
 * positions the foreground layouts snap to). Purely decorative.
 */
export default function GridOverlay() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.grid}>
        <span className={styles.col} />
      </div>
    </div>
  );
}
