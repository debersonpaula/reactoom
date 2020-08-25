import React from 'react';
import { AsyncModel } from './AsyncModel';
import { useModelContext } from 'reactoom';

export function AsyncApp(): JSX.Element {
  const context = useModelContext(AsyncModel);
  return (
    <div>
      Status = {context.status}
      <p>
        <button onClick={() => context.start(true)}>Send success</button>
        <button onClick={() => context.start(false)}>Send failure</button>
        <button onClick={() => context.cancel()}>Cancel</button>
      </p>
      <h4>Logs:</h4>
      {context.messages.map((item, key) => (
        <p key={key}>{item}</p>
      ))}
    </div>
  );
}
