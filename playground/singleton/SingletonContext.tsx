import React from 'react';
import { createStore, ReactoomProvider, useSingleton } from '../../src';

class CounterModel {
  count = 0;

  add(): void {
    this.count++;
  }

  del(): void {
    this.count--;
  }
}

export const SingletonContextComponent: React.FC = () => {
  const counter = useSingleton(CounterModel);
  return (
    <div>
      <h3>SingletonContext</h3>
      <p>Count = {counter.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
    </div>
  );
};

const store = createStore();

const SingletonContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <SingletonContextComponent />
    </ReactoomProvider>
  );
};

export default SingletonContext;
