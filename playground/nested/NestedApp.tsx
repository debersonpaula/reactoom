import React from 'react';
import { useModelContext } from 'reactoom';
import { PromiseContext } from 'playground/promise/PromiseContext';
import { NestedChild } from './NestedChild';

export function NestedApp(): JSX.Element {
  // const promiseContext = useModelContext(PromiseContext);

  // const handleSend = () => {
  //   promiseContext.getDone('From NestedApp');
  // };

  return (
    <div>
      <h3>Nested App</h3>
      {/* <p>
        <button onClick={handleSend}>Send</button>
      </p>
      {promiseContext.isLoading && <p>Loading...</p>}
      {promiseContext.isFailed && <p>Failed!</p>}
      {promiseContext.isCompleted && <p>{promiseContext.response}</p>}

      <hr />

      <NestedChild /> */}
    </div>
  );
}
