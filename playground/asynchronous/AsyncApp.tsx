import React from 'react';
import { AsyncModel } from './AsyncModel';
import { useModelContext } from 'reactoom';

export function AsyncApp(): JSX.Element {
  const context = useModelContext(AsyncModel);
  return (
    <div>
      <p id="status">Status = {context.status}</p>
      <p>
        <button onClick={() => context.start(true)} id="success">Send success</button>
        <button onClick={() => context.start(false)} id="failure">Send failure</button>
        <button onClick={() => context.cancel()} id="cancel">Cancel</button>
      </p>
      <h4>Logs:</h4>
      {context.messages.map((item, key) => (
        <p key={key}>{item}</p>
      ))}
    </div>
  );
}
