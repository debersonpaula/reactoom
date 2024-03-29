import React from 'react';
import { createStore, ReactoomProvider, useSingleton } from '../../src';
import { CounterModel } from '../models/CounterModel';

export const SingletonContextComponent: React.FC = () => {
  const counter = useSingleton(CounterModel);

  React.useEffect(() => {
    counter.add();
  }, []);

  return (
    <div>
      <h3>WithEffectSingletonContext</h3>
      <p>Count = {counter.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
    </div>
  );
};

const store = createStore();

const WithEffectSingletonContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <SingletonContextComponent />
    </ReactoomProvider>
  );
};

export default WithEffectSingletonContext;
