import React from 'react';
import { createStore, ReactoomProvider } from '../../src';
import { SingletonContextComponent } from './SingletonContext';

const store1 = createStore();
const store2 = createStore();

const IsolatedSingletonContext: React.FC = () => {
  return (
    <div>
      <h3>IsolatedSingletonContext</h3>
      <br />
      <ReactoomProvider store={store1}>
        <SingletonContextComponent />
      </ReactoomProvider>
      <ReactoomProvider store={store2}>
        <SingletonContextComponent />
      </ReactoomProvider>
    </div>
  );
};

export default IsolatedSingletonContext;
