import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileUpload } from './index';
import userEvent from '@testing-library/user-event';

test('unit test: FileUpload works', () => {
  const onUpload = jest.fn();
  render(<FileUpload onUpload={onUpload} />);

  const input: HTMLInputElement = screen.getByTestId('file-upload-input');

  expect(input).toBeInTheDocument();

  const file = new File(['some text here'], 'hello.txt', {
    type: 'text/plain',
  });

  userEvent.upload(input, file);

  expect(input!.files![0]).toStrictEqual(file);
  expect(input!.files!.item(0)).toStrictEqual(file);
  expect(input!.files).toHaveLength(1);
  expect(onUpload).toHaveBeenCalledWith(input!.files![0]);
});
