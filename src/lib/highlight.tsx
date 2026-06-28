import { Fragment, type ReactNode } from "react";

/**
 * Renders `title`, wrapping the first occurrence of `word` in an italic-pink
 * span. Keeps heading markup declarative so data stays plain strings.
 */
export function highlight(title: string, word?: string): ReactNode {
  if (!word) return title;

  const index = title.indexOf(word);
  if (index === -1) return title;

  const before = title.slice(0, index);
  const after = title.slice(index + word.length);

  return (
    <Fragment>
      {before}
      <span className="italic-pink">{word}</span>
      {after}
    </Fragment>
  );
}
