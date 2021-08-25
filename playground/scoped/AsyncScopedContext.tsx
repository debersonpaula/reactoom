import React from 'react';
import { useScoped } from '../../src';
import { AsyncLogsModel } from '../models/AsyncLogsModel';

const AsyncScopedContext: React.FC = () => {
  const logs = useScoped(AsyncLogsModel);
  return (
    <div>
      <h3>AsyncScopedContext:</h3>
      <p>
        <button onClick={logs.addAsyncLog}>add async log</button>
        <button onClick={logs.addLog}>add direct log</button>
      </p>
      <ul>
        {logs.messages?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AsyncScopedContext;
