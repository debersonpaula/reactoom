import React from 'react';
import { useScoped } from '../../src';
import { CounterModel } from '../models/CounterModel';

const ScopedContext: React.FC = () => {
  const counter = useScoped(CounterModel);

  return (
    <div>
      <h3>Scoped Context</h3>
      <p>Count = {counter.count}</p>
      <p>SubCount = {counter.subcount.countPlus}</p>
      <p>Property CountPlusOne = {counter.countPlusOne}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
    </div>
  );
};

export default ScopedContext;
