import React from 'react';
import { createStore, ReactoomProvider, useSingleton } from '../../src';
import { CounterModel } from '../models/CounterModel';

export const SingletonContextComponent: React.FC = () => {
  const counter = useSingleton(CounterModel);
  return (
    <div>
      <h3>SingletonContext</h3>
      <p data-testid="scoped-count">Count = {counter.count}</p>
      <button onClick={counter.add} data-testid="scoped-add">
        add
      </button>
      <button onClick={counter.del} data-testid="scoped-del">
        del
      </button>
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
