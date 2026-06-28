export interface NavLink {
  index: string;
  label: string;
  href: string;
}

/** Primary anchor navigation. `href` values match section ids in App. */
export const navLinks: NavLink[] = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Experience", href: "#work" },
  { index: "03", label: "Expertise", href: "#expertise" },
  { index: "04", label: "Stack", href: "#stack" },
  { index: "05", label: "Contact", href: "#contact" },
];
