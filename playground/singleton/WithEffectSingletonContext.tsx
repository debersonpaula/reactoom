import React from 'react';
import { ReactoomProvider, useReactoomSingleton } from '../../src';

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
  const counter = useReactoomSingleton(CounterModel);

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

const WithEffectSingletonContext: React.FC = () => {
  return (
    <ReactoomProvider>
      <SingletonContextComponent />
    </ReactoomProvider>
  );
};

export default WithEffectSingletonContext;
