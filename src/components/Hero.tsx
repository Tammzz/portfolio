// import { Fragment } from "react"; // used by the commented-out animated role marquee
import { useEffect, useState } from "react";
import { Check, FileText, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { easeOut, revealItem } from "../lib/motion";
import { ScrambleText, Typewriter } from "./Terminal";
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
  /** True once the boot loader has finished — kicks off the terminal sequence. */
  boot: boolean;
}

/**
 * Ordered step indices for the terminal boot sequence (see `stage` below). The
 * STATUS.LOG bar is the always-present panel header shown first; these are the
 * body lines that print out one at a time after it.
 */
const STEP = {
  LINE_REACT: 0,
  LINE_PROJECTS: 1,
  LINE_A11Y: 2,
  ROW_BUILD: 3,
  ROW_UPTIME: 4,
  COMMAND: 5,
  HINT: 6,
} as const;

/** Shared fade-in for each terminal line as it prints. Kept subtle (no shake). */
const lineFade = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: easeOut },
} as const;

/**
 * Landing gate: greeting, name, tagline, intro, and the terminal panel whose
 * `npm run portfolio` prompt acts as the entry point into the rest of the site.
 */
export default function Hero({ launched, onLaunch, boot }: HeroProps) {
  // Terminal boot sequence: `stage` is the index of the line currently
  // revealing. Each settled line advances the frontier (idempotently), so the
  // panel prints out one line at a time once the loader has faded.
  const [stage, setStage] = useState(-1);
  const advance = (to: number) => setStage((s) => Math.max(s, to));

  useEffect(() => {
    if (!boot) return;
    const id = window.setTimeout(() => setStage((s) => Math.max(s, STEP.LINE_REACT)), 200);
    return () => window.clearTimeout(id);
  }, [boot]);

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
            {(launched || stage >= STEP.LINE_REACT) && (
              <motion.div className={styles.bootLine} {...lineFade}>
                <Check className={styles.check} size={14} aria-hidden="true" />
                <ScrambleText
                  text="react + typescript loaded"
                  start={!launched}
                  onSettle={() => advance(STEP.LINE_PROJECTS)}
                />
              </motion.div>
            )}
            {(launched || stage >= STEP.LINE_PROJECTS) && (
              <motion.div className={styles.bootLine} {...lineFade}>
                <Check className={styles.check} size={14} aria-hidden="true" />
                <ScrambleText
                  text={`${projects.length} projects indexed`}
                  start={!launched}
                  onSettle={() => advance(STEP.LINE_A11Y)}
                />
              </motion.div>
            )}
            {(launched || stage >= STEP.LINE_A11Y) && (
              <motion.div className={styles.bootLine} {...lineFade}>
                <Check className={styles.check} size={14} aria-hidden="true" />
                <ScrambleText
                  text="a11y audit passed"
                  start={!launched}
                  onSettle={() => advance(STEP.ROW_BUILD)}
                />
              </motion.div>
            )}
            {(launched || stage >= STEP.ROW_BUILD) && (
              <motion.div className={styles.row} {...lineFade}>
                <span>last build</span>
                <b>
                  <ScrambleText
                    text="2026-06-28"
                    start={!launched}
                    onSettle={() => advance(STEP.ROW_UPTIME)}
                  />
                </b>
              </motion.div>
            )}
            {(launched || stage >= STEP.ROW_UPTIME) && (
              <motion.div className={styles.row} {...lineFade}>
                <span>uptime</span>
                <b className={styles.ok}>
                  <ScrambleText
                    text="100%"
                    start={!launched}
                    onSettle={() => advance(STEP.COMMAND)}
                  />
                </b>
              </motion.div>
            )}
            {(launched || stage >= STEP.COMMAND) && (
              <div className={styles.prompt}>
                <span className={styles.pk}>tamara@oslo</span>:~${" "}
                {launched ? (
                  "npm run portfolio"
                ) : (
                  <Typewriter
                    text="npm run portfolio"
                    start
                    onSettle={() => advance(STEP.HINT)}
                  />
                )}
                {!launched && <span className={styles.cursor} aria-hidden="true" />}
              </div>
            )}
            {launched ? (
              <div className={styles.mounted}>
                <Check className={styles.check} size={14} aria-hidden="true" />
                portfolio mounted
              </div>
            ) : (
              stage >= STEP.HINT && (
                <motion.button
                  type="button"
                  className={styles.launchHint}
                  onClick={onLaunch}
                  {...lineFade}
                >
                  <span className={styles.caret} aria-hidden="true">
                    ▸
                  </span>
                  press <kbd className={styles.kbd}>ENTER</kbd> to launch
                </motion.button>
              )
            )}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
