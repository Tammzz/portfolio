import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { revealContainer, revealItem, viewportOnce } from "../lib/motion";
import SectionHeader from "./SectionHeader";
import styles from "./Contact.module.css";

const EMAIL = "tamara.awadh@outlook.com";

const socials = [
  { label: "GitHub", href: "https://github.com/tammzz" },
  { label: "Resume", href: "/resume.html" },
];

/** Dramatic final contact section. */
export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <motion.div
        className={`container ${styles.inner}`}
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={revealItem}>
          <SectionHeader index="05" label="OPEN_CHANNEL" meta="GET IN TOUCH" />
        </motion.div>

        <motion.h2 className={`display ${styles.heading}`} variants={revealItem}>
          Let&apos;s make it
          <br />
          happen <span className="italic-pink">together</span>.
        </motion.h2>

        <motion.a className={styles.email} href={`mailto:${EMAIL}`} variants={revealItem}>
          <span className="mono mono-pink">[→]</span> {EMAIL}
        </motion.a>

        <motion.nav
          className={styles.socials}
          aria-label="Social and contact links"
          variants={revealItem}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              className={styles.social}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              // {s.label}
              {s.href.startsWith("http") && (
                <ArrowRight size={10} aria-hidden="true" className={styles.socialArrow} />
              )}
            </a>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  );
}
