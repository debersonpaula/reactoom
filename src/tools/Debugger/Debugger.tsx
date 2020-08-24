import React from 'react';
import ReactDOM from 'react-dom';
import './debug-style.css';

export let DebugMode = false;

export function EnableDebugger() {
  const debuggerContainer = document.createElement('div');
  debuggerContainer.id = 'debugger';
  document.body.appendChild(debuggerContainer);
  ReactDOM.render(<Debugger />, debuggerContainer);
  DebugMode = true;
}

function Debugger() {
  return <div>DEBUGGER</div>;
}
