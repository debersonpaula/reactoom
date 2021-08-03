import React from 'react';
import { createStore, injectSingleton, ReactoomProvider, useSingleton } from '../../src';

class DepOneModel {
  count = 0;

  increment(): void {
    this.count++;
  }
}

class DepTwoModel {
  count = 0;
  stateOne = injectSingleton(DepOneModel);

  increment(): void {
    const stateOne = this.stateOne;
    this.count = stateOne.count + 2;
    stateOne.increment();
  }
}

const DepsContextApp: React.FC = () => {
  const counterOne = useSingleton(DepOneModel);
  const counterTwo = useSingleton(DepTwoModel);

  return (
    <div>
      <h3>DepsContext</h3>

      <p>DepOneModel Count = {counterOne.count}</p>
      <button onClick={counterOne.increment}>add model one</button>

      <p>DepTwoModel Count = {counterTwo.count}</p>
      <button onClick={counterTwo.increment}>add model two</button>
    </div>
  );
};

const store = createStore();

const DepsContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <DepsContextApp />
    </ReactoomProvider>
  );
};

export default DepsContext;
