/**
 * Content for the About section: narrative copy + a spec-sheet of runtime
 * stats rendered in the bracketed panel. Kept in the data layer so the
 * component stays purely presentational.
 */

export interface AboutStat {
  /** Mono key, e.g. "BASED" */
  label: string;
  /** Human-readable value */
  value: string;
}

/** Lead + body paragraphs, rendered in order. */
export const aboutParagraphs: string[] = [
  "It began with fandom pages.",
  "Back in 2017, I got into HTML and CSS while curating content on Fandom Wiki, mostly by experimenting with layouts, tabs, and small design details to make pages feel more organised and visually interesting. What began as a hobby eventually became paid work, and it is still where a lot of my interest in web design comes from: making information easier to use, nicer to look at, and more enjoyable to interact with.",
  "After taking a different path for a while, I found my way back to IT. Through my bachelor’s degree, personal projects, and work, I’ve built experience designing and developing digital products from idea to implementation. I care about clean structure, thoughtful user experience, and interfaces that feel polished without becoming overcomplicated.",
  "Outside of code, I do graphic design, create book covers for authors, work on brand identity projects, read, game, and generally gravitate towards anything creative and cozy.",
];

/** Right-hand "spec sheet" — reads like a system manifest. */
export const aboutStats: AboutStat[] = [
  { label: "ROLE", value: "full stack dev / graphic designer" },
  { label: "BASED", value: "Oslo, NO" },
  { label: "FOCUS", value: "accessible web apps & UI/UX" },
  { label: "STATUS", value: "open to new work" },
];
