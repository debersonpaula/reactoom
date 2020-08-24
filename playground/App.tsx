import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes } from './Routes';

export function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
}
