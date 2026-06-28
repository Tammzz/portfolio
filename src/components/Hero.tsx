// import { Fragment } from "react"; // used by the commented-out animated role marquee
import { Check, FileText, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { revealItem } from "../lib/motion";
import { projects } from "../data/projects";
import styles from "./Hero.module.css";

/** Orchestrated entrance: children rise in sequence once the page loads. */
const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.15, staggerChildren: 0.1 },
  },
};

/** A CTA: rises in with the rest, lifts on hover (which also nudges its icon). */
const ctaVariants: Variants = {
  hidden: revealItem.hidden,
  visible: revealItem.visible,
  hover: { y: -2 },
};

/** Trailing icon inside a CTA — slides on parent hover via variant propagation. */
const ctaIcon: Variants = {
  hover: { x: 3 },
};

interface HeroProps {
  /** Whether the site has been launched past the terminal gate. */
  launched: boolean;
  /** Reveals the rest of the site and scrolls to it. */
  onLaunch: () => void;
}

/**
 * Landing gate: greeting, name, tagline, intro, and the terminal panel whose
 * `npm run portfolio` prompt acts as the entry point into the rest of the site.
 */
export default function Hero({ launched, onLaunch }: HeroProps) {
  return (
    <section id="top" className={styles.hero}>
      {/* Technical metadata band (desktop) 
      <motion.div
        className={styles.meta}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: easeOut }}
      >
        <span>LAT 59.9139° N // LON 10.7522° E</span>
        <span className={styles.metaDim}>[ TRANSMISSION_OK ]</span>
      </motion.div>*/}

      <motion.div
        className={`container ${styles.inner}`}
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.lead}>
          <motion.p className={`mono mono-pink ${styles.eyebrow}`} variants={revealItem}>
            [ HI, MY NAME IS ]
          </motion.p>

          <motion.h1 className={styles.name} variants={revealItem}>
            Tamara Awadh
          </motion.h1>

          <motion.p className={styles.roleLine} variants={revealItem}>
            FULL STACK DEVELOPER // GRAPHIC DESIGNER
          </motion.p>

          {/* --- Alternative: animated looping marquee role tag (kept for comparison) ---
          <motion.div
            className={styles.roleTag}
            variants={revealItem}
            aria-label="full stack developer and graphic designer"
          >
            {/* Track is rendered twice so the marquee loops seamlessly. * /}
            <ul className={styles.track} aria-hidden="true">
              {[0, 1].map((copy) => (
                <Fragment key={copy}>
                  <li className={styles.role}>full stack developer</li>
                  <li className={styles.star}>✧</li>
                  <li className={styles.role}>graphic designer</li>
                  <li className={styles.star}>✧</li>
                </Fragment>
              ))}
            </ul>
          </motion.div>
          --- */}

          <motion.p className={`display ${styles.tagline}`} variants={revealItem}>
            I build web experiences where{" "}
            <span className={`italic-pink ${styles.accent}`}>design</span>{" "}
            &amp;{" "}
            <span className={`italic-green ${styles.accent}`}>code</span>{" "}
            meet.
          </motion.p>

          <motion.div className={styles.sub} variants={revealItem}>
            <div className="signal" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
            <p className={styles.subText}>
              I’m a full stack developer &amp; graphic designer based in Oslo,
              focused on crafting modern, minimal interfaces that feel polished
              without becoming overcomplicated.
            </p>
          </motion.div>

          <motion.div className={styles.socials} variants={revealItem}>
            <a
              className={styles.socialIcon}
              href="https://github.com/tammzz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              className={styles.socialIcon}
              href="https://www.linkedin.com/in/tamara-awadh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div className={styles.actions} variants={revealItem}>
            <motion.a
              className={styles.cta}
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              variants={ctaVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              VIEW RESUME
              <motion.span variants={ctaIcon} style={{ display: "inline-flex" }}>
                <FileText size={13} aria-hidden="true" />
              </motion.span>
            </motion.a>
            {/*<motion.a
              className={styles.ctaGhost}
              href="#contact"
              onClick={handleSectionNav}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              GET IN TOUCH
            </motion.a>*/}
          </motion.div>
        </div>

        {/* Terminal status panel — fills the former dead space to the right */}
        <motion.aside className={styles.panel} aria-label="Status" variants={revealItem}>
          <span className="corner corner-tl" style={{ borderColor: "var(--border-strong)" }} />
          <span className="corner corner-tr" style={{ borderColor: "var(--border-strong)" }} />
          <span className="corner corner-bl" style={{ borderColor: "var(--border-strong)" }} />
          <span className="corner corner-br" style={{ borderColor: "var(--border-strong)" }} />
          <div className={styles.bar}>
            <span className={styles.dot} aria-hidden="true" />
            STATUS.LOG
          </div>
          <div className={styles.body}>
            <div className={styles.bootLine}>
              <Check className={styles.check} size={14} aria-hidden="true" />
              react + typescript loaded
            </div>
            <div className={styles.bootLine}>
              <Check className={styles.check} size={14} aria-hidden="true" />
              {projects.length} projects indexed
            </div>
            <div className={styles.bootLine}>
              <Check className={styles.check} size={14} aria-hidden="true" />
              a11y audit passed
            </div>
            <div className={styles.row}>
              <span>last build</span>
              <b>2026-06-28</b>
            </div>
            <div className={styles.row}>
              <span>uptime</span>
              <b className={styles.ok}>100%</b>
            </div>
            <div className={styles.prompt}>
              <span className={styles.pk}>tamara@oslo</span>:~$ npm run portfolio
              {!launched && <span className={styles.cursor} aria-hidden="true" />}
            </div>
            {launched ? (
              <div className={styles.mounted}>
                <Check className={styles.check} size={14} aria-hidden="true" />
                portfolio mounted
              </div>
            ) : (
              <button
                type="button"
                className={styles.launchHint}
                onClick={onLaunch}
              >
                <span className={styles.caret} aria-hidden="true">
                  ▸
                </span>
                press <kbd className={styles.kbd}>ENTER</kbd> to launch
              </button>
            )}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
