import React from 'react';
import { useModelContext } from 'reactoom';
import { CounterModel } from './CounterModel';
import { CounterComponent } from './CounterComponent';

export function CounterApp(): JSX.Element {
  const counterContext = useModelContext(CounterModel);
  return <CounterComponent count={counterContext.count} add={counterContext.add} del={counterContext.del} />;
}
