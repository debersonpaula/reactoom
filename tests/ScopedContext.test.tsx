import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScopedContext from '../playground/scoped/ScopedContext';

describe('ScopedContext', () => {
  // -----------------------------------------------------------------------------------
  beforeEach(() => {
    render(<ScopedContext />);
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
  it('should simulate add (+3) and del (-1) and render counter with 2', async () => {
    const buttonAdd = screen.getByTestId('scoped-add');
    fireEvent.click(buttonAdd);    
    fireEvent.click(buttonAdd);
    fireEvent.click(buttonAdd);

    const buttonDel = screen.getByTestId('scoped-del');
    fireEvent.click(buttonDel);
    
    expect(screen.getByTestId('scoped-count')).toHaveTextContent('Count = 2');
  });
  // -----------------------------------------------------------------------------------
});

