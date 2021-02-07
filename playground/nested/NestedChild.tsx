import React from 'react';
import { useModelContext } from 'reactoom';
import { PromiseContext } from 'playground/promise/PromiseContext';

export function NestedChild(): JSX.Element {
  const promiseContext = useModelContext(PromiseContext);

  const handleSend = () => {
    promiseContext.getDone('From NestedChild');
  };

  return (
    <div>
      <h3>Nested Child</h3>
      <p>
        <button onClick={handleSend}>Send</button>
      </p>
      {promiseContext.isLoading && <p>Loading...</p>}
      {promiseContext.isFailed && <p>Failed!</p>}
      {promiseContext.isCompleted && <p>{promiseContext.response}</p>}
    </div>
  );
}
