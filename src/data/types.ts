/**
 * Shared domain types for the portfolio data layer.
 * Data lives in dedicated modules and is mapped over in components.
 */

export interface Project {
  /** Two-digit ordinal, e.g. "01" */
  id: string;
  /** Reference code shown in the terminal index, e.g. "LN_091" */
  ref: string;
  year: string;
  /** Full title; the word at `italicWord` is rendered italic + pink */
  title: string;
  /** Optional word inside `title` to highlight in pink italic */
  italicWord?: string;
  /** Client / company line */
  company: string;
  /** Category label, e.g. "CLOUD // INFRASTRUCTURE" */
  category: string;
  description: string;
  tags: string[];
  /** External or anchor link for "VIEW →" */
  href: string;
}

export interface ExpertiseItem {
  /** Code label, e.g. "01.A" */
  code: string;
  title: string;
  description: string;
}

export interface Tool {
  name: string;
  /** Priority tools render a pink indicator; others muted grey */
  priority: boolean;
}
