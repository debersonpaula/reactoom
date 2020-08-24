import React from 'react';
import { PromiseModel } from './PromiseModel';
import { useModelContext } from 'reactoom';

export function PromiseApp() {
  const context = useModelContext(PromiseModel);
  return (
    <div>
      Status = {context.status}
      <p>
        <button onClick={() => context.start(true)}>Send success</button>
      </p>
    </div>
  );
}
