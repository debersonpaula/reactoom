import React from 'react';
import { useModelContext } from 'reactoom';
import { HttpContext } from './HttpContext';
import { PromiseContext } from './PromiseContext';

export function PromiseApp(): JSX.Element {
  const promiseContext = useModelContext(PromiseContext);
  const httpContext = useModelContext(HttpContext);

  const handleSucess = () => {
    promiseContext.getDone('Sucess from Context');
  };

  const handleFailure = () => {
    promiseContext.getError('Failure from Context');
  };

  return (
    <div>
      <h3>Promise based logic</h3>
      <p>
        <button onClick={handleSucess}>Send Success</button>
        <button onClick={handleFailure}>Send Fail</button>
      </p>
      {promiseContext.isLoading && <p>Loading...</p>}
      {promiseContext.isFailed && <p>Failed!</p>}
      {promiseContext.isCompleted && <p>{promiseContext.response}</p>}

      <br />

      <h3>Http based logic</h3>
      <p>
        <button onClick={httpContext.getDone}>Get Success call</button>
        <button onClick={httpContext.getError}>Get Failure call</button>
      </p>
      {httpContext.isLoading && <p>Loading...</p>}
      {httpContext.isFailed && <p>Failed!</p>}
      {httpContext.isCompleted && <p>{JSON.stringify(httpContext.response)}</p>}
    </div>
  );
}
