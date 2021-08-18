import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SingletonContext from '../playground/singleton/SingletonContext';

describe('SingletonContext', () => {
  // -----------------------------------------------------------------------------------
  beforeEach(() => {
    render(<SingletonContext />);
  });
  // -----------------------------------------------------------------------------------
  it('should render initial counter with 0', () => {
    expect(screen.getByTestId('scoped-count')).toHaveTextContent('Count = 0');
  });
  // -----------------------------------------------------------------------------------
  it('should simulate add (+3) and render counter with 3', async () => {
    const buttonAdd = screen.getByTestId('scoped-add');
    fireEvent.click(buttonAdd);
    fireEvent.click(buttonAdd);
    fireEvent.click(buttonAdd);
    expect(screen.getByTestId('scoped-count')).toHaveTextContent('Count = 3');
  });
  // -----------------------------------------------------------------------------------
  it('should simulate del (-1) and render counter with 2', async () => {
    const buttonDel = screen.getByTestId('scoped-del');
    fireEvent.click(buttonDel);

    expect(screen.getByTestId('scoped-count')).toHaveTextContent('Count = 2');
  });
  // -----------------------------------------------------------------------------------
});
