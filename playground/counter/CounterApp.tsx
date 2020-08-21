import React from 'react';
import { Store } from 'reactoom';
import { CounterModel } from './CounterModel';
import { CounterComponent } from './CounterComponent';

export function CounterApp(): JSX.Element {
  return (
    <Store models={[CounterModel]}>
      <CounterComponent />
    </Store>
  );
}
