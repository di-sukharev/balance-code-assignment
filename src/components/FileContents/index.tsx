import { HTMLAttributes, useEffect, useState } from 'react';
import './styles.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  content: string | null;
  query?: string;
  focusedMatch?: number;
  onMatchesChange?: (matches: Element[]) => void;
}

export const FileContents: React.FC<Props> = ({
  content,
  query = '',
  className,
  focusedMatch = 0,
  onMatchesChange,
}) => {
  const [matches, setMatches] = useState<Element[]>([]);

  useEffect(() => {
    setMatches(Array.from(document.getElementsByClassName('highlighted')));
  }, [query]);

  useEffect(() => {
    const el = matches[focusedMatch - 1];

    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusedMatch, matches]);

  useEffect(() => {
    if (onMatchesChange) onMatchesChange(matches);
  }, [matches]);

  const highlightedContent = content?.replace(
    new RegExp(query, 'ig'),
    (match) =>
      `<span data-testid="query-match" class="highlighted">${match}</span>`
  );

  if (!highlightedContent) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: highlightedContent }}
    />
  );
};
