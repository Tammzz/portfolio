import type { Tool } from "./types";

/**
 * Tech arsenal. `priority: true` renders a pink square indicator.
 */
export const tools: Tool[] = [
  { name: "JavaScript", priority: true },
  { name: "TypeScript", priority: true },
  { name: "React.js", priority: true },
  { name: "C#", priority: true },
  { name: ".NET", priority: true },
  { name: "Python", priority: true },
  { name: "Java", priority: false },
  { name: "Node.js", priority: false },
  { name: "Supabase", priority: false },
  { name: "HTML5", priority: false },
  { name: "CSS3", priority: false },
  { name: "Vite", priority: false },
  { name: "WordPress", priority: false },
  { name: "Git / GitHub", priority: false },
  { name: "Figma", priority: false },
  { name: "Photoshop", priority: false },
  { name: "Illustrator", priority: false },
];
