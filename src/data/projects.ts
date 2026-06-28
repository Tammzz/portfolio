import type { Project } from "./types";

/**
 * Professional experience, framed as deployments. Order defines the index
 * list and the default featured entry (first entry).
 */
export const projects: Project[] = [
  {
    id: "01",
    ref: "EX_026",
    year: "2026",
    title: "Healthcare Communication Platform",
    italicWord: "Platform",
    company: "OsloMet — Full-Stack Developer",
    category: "FULL STACK // HEALTHCARE",
    description:
      "A healthcare communication platform selected by OsloMet for further institutional development. Designed a distributed multi-device ecosystem linking caregiver web apps, patient-facing Smart TV interfaces, and backend services — built with .NET, Supabase, and realtime communication. Designed the UI/UX for scheduling, visit management, route planning, digital consultations, and patient messaging, with supporting system-architecture documentation.",
    tags: [".NET", "Supabase", "UI/UX"],
    href: "/resume.html",
  },
  {
    id: "02",
    ref: "EX_025",
    year: "2025",
    title: "Client Web & Accessibility",
    italicWord: "Accessibility",
    company: "Diversify — Web Developer Intern",
    category: "FRONTEND // ACCESSIBILITY",
    description:
      "Developed and maintained client websites on a WordPress CMS, contributing frontend work in HTML, CSS, and JavaScript. Ran WCAG accessibility audits and recommended compliance enhancements for inclusive, responsive layouts, and applied SEO best practices — producing audit reports and sitemaps to support redesigns.",
    tags: ["WordPress", "WCAG", "SEO"],
    href: "/resume.html",
  },
  {
    id: "03",
    ref: "EX_022",
    year: "2022",
    title: "Brand Identity System",
    italicWord: "Identity",
    company: "Tamu Swahili Food AS — Creative Director",
    category: "BRANDING // DESIGN",
    description:
      "Built the full brand identity — logo, marks, palette, and visual system — for an early-stage food start-up. Manage the social channels and design on-site collateral such as stalls, posters, and signage for events.",
    tags: ["Branding", "Figma", "Photoshop"],
    href: "/resume.html",
  },
];

/** A briefer role outside the core technical track. */
export interface AdditionalRole {
  role: string;
  org: string;
  period: string;
}

/**
 * Additional experience — shorter roles rendered as a compact list beneath
 * the featured experience.
 */
export const additionalExperience: AdditionalRole[] = [
  { role: "Pharmacy Assistant", org: "VitusApotek, Oslo", period: "2022 — 2023" },
  { role: "Teaching Assistant", org: "PVS, Oslo", period: "2021 — Now" },
  { role: "Journalist", org: "NorwayToday, Oslo", period: "2020 — 2021" },
  { role: "Content Manager", org: "GTS Nordic, Oslo", period: "2019 — 2020" },
];
