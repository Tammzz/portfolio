import styles from "./Footer.module.css";

/** Terminal / security-style footer. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className="signal" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} />
            ))}
          </span>
          <span>SECURE TERMINAL // NO_UNAUTH_ACCESS</span>
        </div> 

        <div className={styles.meta}>
          <span>© TAMARA.AWADH 2026 // ALL RIGHTS RESERVED</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>Designed &amp; engineered by Tamara Awadh</span>
        <span>Built with React + Vite + Typescript, deployed with Vercel</span>
      </div>
    </footer>
  );
}
