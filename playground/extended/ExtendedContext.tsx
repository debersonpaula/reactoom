import React from 'react';
import { createStore, ReactoomProvider, useSingleton } from '../../src';

class BaseModel {
  count = 0;

  sum(value: number): void {
    this.setValue(this.count + value);
  }

  setValue(value: number): void {
    this.count = value;
  }

  extendable(value: number): void {
    this.count = this.count + value;
  }
}

class CounterModel extends BaseModel {
  add(): void {
    this.sum(1);
  }

  del(): void {
    this.sum(-1);
  }

  reset = () => {
    this.setValue(0);
  };

  extendable(): void {
    super.extendable(5);
  }
}

const ExtendedContextApp: React.FC = () => {
  const counter = useSingleton(CounterModel);

  return (
    <div>
      <h3>ExtendedContext</h3>
      <p>Count = {counter.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
      <button onClick={counter.reset}>reset</button>
      <button onClick={counter.extendable}>extendable</button>
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
