import React from 'react';
import { createStore, ReactoomProvider } from '../../src';
import { SingletonContextComponent } from './SingletonContext';

const store = createStore();

const MultipleSingletonContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <h3>MultipleSingletonContext</h3>
      <br />
      <SingletonContextComponent />
      <SingletonContextComponent />
    </ReactoomProvider>
  );
};

export default MultipleSingletonContext;
