import React from 'react';
import { createStore, ReactoomProvider, useSingleton } from '../../src';
import { AsyncCounterModel } from '../models/AsyncCounterModel';

const AsyncSingletonContextComponent: React.FC = () => {
  const counter = useSingleton(AsyncCounterModel);
  return (
    <div>
      <h3>AsyncSingletonContext</h3>
      <p>Count = {counter.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
    </div>
  );
};

const store = createStore();

const AsyncSingletonContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <AsyncSingletonContextComponent />
    </ReactoomProvider>
  );
};

export default AsyncSingletonContext;
