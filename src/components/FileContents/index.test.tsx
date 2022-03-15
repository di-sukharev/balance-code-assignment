import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileContents } from './index';

test('unit test: FileContents works with 2 matches', () => {
  render(<FileContents content="some content here and here" query="here" />);

  expect(screen.getAllByTestId('query-match').length).toBe(2);
});

test('unit test: FileContents works with 6 matches', () => {
  render(<FileContents content="some content here and here" query="e" />);

  expect(screen.getAllByTestId('query-match').length).toBe(6);
});

test('unit test: FileContents works with 5 matches', () => {
  render(
    <FileContents
      content="hello my friend, how do you think how many matches are here?"
      query="o"
    />
  );

  expect(screen.getAllByTestId('query-match').length).toBe(5);
});
