import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { SearchBar } from '../components/SearchBar';
import { FileUpload } from '../components/FileUpload';
import { FileContents } from '../components/FileContents';

function App() {
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileUpload = (file: File | null) => {
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (e) {
        setFileContent((e.target?.result as string) ?? null);
      };
      reader.onerror = function () {
        setFileContent(null);
      };
    }
  };

  const [query, setQuery] = useState<string>();
  const [focusedMatch, setFocusedMatch] = useState<number>(0);
  const [matches, setMatches] = useState<Element[]>([]);

  return (
    <div className={styles.app}>
      <div className={styles.title}>
        Upload a .txt file and press CMD+F to search through file content
      </div>
      <SearchBar
        className={styles.searchBar}
        matchesCount={matches.length}
        onQueryChange={setQuery}
        onFocusChange={setFocusedMatch}
      />
      <FileUpload className={styles.fileUpload} onUpload={handleFileUpload} />
      <FileContents
        className={styles.fileContents}
        query={query}
        content={fileContent}
        focusedMatch={focusedMatch}
        onMatchesChange={setMatches}
      />
    </div>
  );
}

export default App;
