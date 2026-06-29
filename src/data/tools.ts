import type { ToolCategory } from "./types";

/**
 * Tech arsenal, grouped by category. `priority: true` renders a pink square indicator.
 */
export const toolCategories: ToolCategory[] = [
  {
    label: "Programming Languages",
    tools: [
      { name: "JavaScript", priority: true },
      { name: "TypeScript", priority: true },
      { name: "C#", priority: true },
      { name: "Python", priority: true },
      { name: "Java", priority: false },
      { name: "HTML5", priority: false },
      { name: "CSS3", priority: false },
    ],
  },
  {
    label: "Libraries & Frameworks",
    tools: [
      { name: "React.js", priority: true },
      { name: ".NET", priority: true },
      { name: "Node.js", priority: false },
      { name: "TailwindCSS", priority: false },
      { name: "Bootstrap", priority: false },
    ],
  },
  {
    label: "Tools & Platforms",
    tools: [
      { name: "Git / GitHub", priority: true },
      { name: "Vite", priority: true },
      { name: "Vercel", priority: false },
      { name: "Supabase", priority: false },
      { name: "MongoDB", priority: false },
      { name: "MySQL", priority: false },
      { name: "WordPress", priority: false },
      { name: "Figma", priority: false },
      { name: "Photoshop", priority: false },
      { name: "Illustrator", priority: false },
    ],
  },
];
