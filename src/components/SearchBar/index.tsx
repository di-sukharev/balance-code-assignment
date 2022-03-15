import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as ArrowUpIcon } from './up-arrow.svg';
import { ReactComponent as ArrowDownIcon } from './down-arrow.svg';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onQueryChange: (value: string) => void;
  onFocusChange: (value: number) => void;
  matchesCount: number;
}

export const SearchBar: React.FC<Props> = ({
  onQueryChange,
  className,
  matchesCount,
  onFocusChange,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [focusedMatch, setFocusedMatch] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearQuery = () => onQueryChange('');
  const clearFocusedMatch = () => setFocusedMatch(0);

  const toggleVisible = () => {
    setVisible((prev) => !prev);
    if (inputRef.current) inputRef.current.focus();
    clearFocusedMatch();
    clearQuery();
  };

  const handleCmdAndF = (event: any) => {
    if (event.metaKey && event.key === 'f') {
      event.preventDefault();
      toggleVisible();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleCmdAndF);
    return () => document.removeEventListener('keydown', handleCmdAndF);
  }, []);

  const handleArrowDown = () => {
    if (matchesCount === 0) return;
    else {
      setFocusedMatch((current) =>
        current === matchesCount ? 1 : current + 1
      );
    }
  };
  const handleArrowUp = () => {
    if (matchesCount === 0) return;
    else {
      setFocusedMatch((current) =>
        current === 1 ? matchesCount : current - 1
      );
    }
  };

  useEffect(() => {
    onFocusChange(focusedMatch);
  }, [focusedMatch]);

  if (!visible) return null;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.matches}>
        {focusedMatch}/{matchesCount}
      </div>
      <input
        ref={inputRef}
        data-testid="query-input"
        type="text"
        onChange={(e) => onQueryChange(e.currentTarget.value)}
      />
      <ArrowUpIcon
        data-testid="arrow-up-btn"
        onClick={handleArrowUp}
        className={styles.icon}
      />
      <ArrowDownIcon
        data-testid="arrow-down-btn"
        onClick={handleArrowDown}
        className={styles.icon}
      />
      <CloseIcon
        data-testid="close-btn"
        onClick={toggleVisible}
        className={styles.icon}
      />
    </div>
  );
};
