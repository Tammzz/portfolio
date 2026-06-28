import styles from "./SectionHeader.module.css";

interface Props {
  /** Two-digit section number, e.g. "01" */
  index: string;
  /** Technical label, e.g. "SELECTED_DEPLOYMENTS" */
  label: string;
  /** Right-aligned metadata, e.g. "QTY: 04" (hidden on mobile) */
  meta?: string;
}

/** Reusable metadata row: [ NN ] LABEL ───── META */
export default function SectionHeader({ index, label, meta }: Props) {
  return (
    <div className={styles.row}>
      <span className="mono mono-pink">[ {index} ]</span>
      <span className={styles.label}>{label}</span>
      <span className={styles.rule} aria-hidden="true" />
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
  );
}
