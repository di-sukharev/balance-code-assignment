import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './index';
import userEvent from '@testing-library/user-event';

test('unit test: SearchBar arrows work', async () => {
  const onFocusChange = jest.fn();
  const onQueryChange = jest.fn();

  render(
    <SearchBar
      onQueryChange={onQueryChange}
      onFocusChange={onFocusChange}
      matchesCount={3}
    />
  );

  expect(onFocusChange).toBeCalledTimes(1);

  fireEvent.keyDown(document.body, { key: 'f', keyCode: 70, metaKey: true });

  const arrowUpBtn = screen.getByTestId('arrow-up-btn');
  const arrowDownBtn = screen.getByTestId('arrow-down-btn');
  expect(arrowUpBtn).toBeInTheDocument();
  expect(arrowDownBtn).toBeInTheDocument();

  userEvent.click(arrowDownBtn);
  expect(onFocusChange).toBeCalledTimes(2);
  expect(onFocusChange).toBeCalledWith(1);
  userEvent.click(arrowDownBtn);
  expect(onFocusChange).toBeCalledTimes(3);
  expect(onFocusChange).toBeCalledWith(2);
  userEvent.click(arrowDownBtn);
  expect(onFocusChange).toBeCalledTimes(4);
  expect(onFocusChange).toBeCalledWith(3);
  userEvent.click(arrowDownBtn);
  expect(onFocusChange).toBeCalledTimes(5);
  expect(onFocusChange).toBeCalledWith(0);
  userEvent.click(arrowUpBtn);
  expect(onFocusChange).toBeCalledTimes(6);
  expect(onFocusChange).toBeCalledWith(3);
  userEvent.click(arrowUpBtn);
  expect(onFocusChange).toBeCalledTimes(7);
  expect(onFocusChange).toBeCalledWith(2);
  userEvent.click(arrowUpBtn);
  expect(onFocusChange).toBeCalledTimes(8);
  expect(onFocusChange).toBeCalledWith(1);
  userEvent.click(arrowUpBtn);
  expect(onFocusChange).toBeCalledTimes(9);
  expect(onFocusChange).toBeCalledWith(3);
});

test('unit test: SearchBar input works', async () => {
  const onFocusChange = jest.fn();
  const onQueryChange = jest.fn();

  render(
    <SearchBar
      onQueryChange={onQueryChange}
      onFocusChange={onFocusChange}
      matchesCount={3}
    />
  );

  fireEvent.keyDown(document.body, { key: 'f', keyCode: 70, metaKey: true });

  const input = screen.getByTestId('query-input');
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'hello' } });
  expect(onQueryChange).toBeCalledTimes(2);
  expect(onQueryChange).toBeCalledWith('hello');

  fireEvent.keyDown(document.body, { key: 'f', keyCode: 70, metaKey: true });
  expect(input).not.toBeInTheDocument();
  expect(onQueryChange).toBeCalledWith('');
});

test('SearchBar close btn works', async () => {
  const onFocusChange = jest.fn();
  const onQueryChange = jest.fn();

  render(
    <SearchBar
      onQueryChange={onQueryChange}
      onFocusChange={onFocusChange}
      matchesCount={3}
    />
  );

  fireEvent.keyDown(document.body, { key: 'f', keyCode: 70, metaKey: true });

  const closeBtn = screen.getByTestId('close-btn');
  expect(closeBtn).toBeInTheDocument();

  userEvent.click(closeBtn);
  expect(closeBtn).not.toBeInTheDocument();
  expect(onQueryChange).toBeCalledWith('');
});
