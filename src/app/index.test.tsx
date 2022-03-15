import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './index';
import userEvent from '@testing-library/user-event';

test('integration test: all components work together', async () => {
  render(<App />);

  const fileInput: HTMLInputElement = screen.getByTestId('file-upload-input');

  expect(fileInput).toBeInTheDocument();

  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, incidunt';

  const file = new File([text], 'hello.txt', {
    type: 'text/plain',
  });

  userEvent.upload(fileInput, file);

  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => expect(screen.getByText(text)).toBeInTheDocument());

  fireEvent.keyDown(document.body, { key: 'f', keyCode: 70, metaKey: true });

  const textInput = screen.getByTestId('query-input');
  expect(textInput).toBeInTheDocument();

  fireEvent.change(textInput, { target: { value: 'ipsum' } });
  expect(screen.getAllByTestId('query-match').length).toBe(1);

  fireEvent.change(textInput, { target: { value: 'consectetur' } });
  expect(screen.getAllByTestId('query-match').length).toBe(1);

  fireEvent.change(textInput, { target: { value: 'o' } });
  expect(screen.getAllByTestId('query-match').length).toBe(4);

  fireEvent.keyDown(document.body, { key: 'f', keyCode: 70, metaKey: true });

  expect(textInput).not.toBeInTheDocument();
});
