import React from 'react';
import { useScoped } from '../../src';

class CounterModel {
  count = 0;

  subcount = {
    count: 0,
  };

  add(): void {
    this.count++;
    this.subcount.count = this.count * 2;
  }

  del(): void {
    this.count--;
    this.subcount.count = this.count * 2;
  }
}

const ScopedContext: React.FC = () => {
  const counter = useScoped(CounterModel);

  return (
    <div>
      <h3>ScopedContext</h3>
      <p>Count = {counter.count}</p>
      <p>SubCount = {counter.subcount.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
    </div>
  );
};

export default ScopedContext;
