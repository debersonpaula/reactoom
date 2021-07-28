import React from 'react';
import { useReactoomScoped } from '../../src';

class AsyncLogsModel {
  messages: string[] = [];

  addAsyncLog(): void {
    setTimeout(() => {
      this.addLog();
    }, 1000);
  }

  addLog(): void {
    this.messages.push(new Date().toISOString());
  }
}

const AsyncScopedContext: React.FC = () => {
  const logs = useReactoomScoped(AsyncLogsModel);
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
