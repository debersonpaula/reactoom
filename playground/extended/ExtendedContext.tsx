import React from 'react';
import { Action, createStore, Model, ReactoomProvider, useSingleton } from '../../src';
import { CounterModel } from '../models/CounterModel';

@Model()
class ExtendedCounterModel extends CounterModel {
  @Action()
  reset() {
    this.count = 0;
  }
}

const ExtendedContextApp: React.FC = () => {
  const counter = useSingleton(ExtendedCounterModel);

  return (
    <div>
      <h3>ExtendedContext</h3>
      <p>Count = {counter.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
      <button onClick={counter.reset}>reset</button>
    </div>
  );
};

const store = createStore();

const ExtendedContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <ExtendedContextApp />
    </ReactoomProvider>
  );
};

export default ExtendedContext;
