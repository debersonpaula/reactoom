import React from 'react';
import { Action, createStore, Model, ReactoomProvider, useSingleton } from '../../src';

@Model()
class DepOneModel {
  count = 0;

  @Action()
  increment(): void {
    this.count++;
  }
}

@Model()
class DepTwoModel {
  count = 0;

  constructor(public depOne: DepOneModel) {}

  @Action()
  increment(): void {
    this.count++;
    this.depOne.increment();
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
