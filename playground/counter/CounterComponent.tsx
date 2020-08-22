import React from 'react';

export function CounterComponent(props: IProps): JSX.Element {
  return (
    <div>
      <p>Counter = {props.count}</p>
      <p>
        <button onClick={props.add}>Add</button>
        <button onClick={props.del}>Del</button>
      </p>
    </div>
  );
}

interface IProps {
  count: number;
  add: () => void;
  del: () => void;
}
