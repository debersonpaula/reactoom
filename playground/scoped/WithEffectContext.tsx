import React from 'react';
import { useScoped } from '../../src';

class CounterModel {
  count = 0;

  add(): void {
    this.count++;
  }

  del(): void {
    this.count--;
  }
}

const WithEffectContext: React.FC = () => {
  const counter = useScoped(CounterModel);

  React.useEffect(() => {
    counter.add();
  }, []);

  return (
    <div>
      <h3>With useEffect Context</h3>
      <p>Count = {counter.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
    </div>
  );
};

export default WithEffectContext;
