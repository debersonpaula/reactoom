import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { AsyncApp } from './asynchronous/AsyncApp';
import { CounterApp } from './counter/CounterApp';

export function Routes(): JSX.Element {
  const components = [CounterApp, AsyncApp];
  return (
    <div>
      <ul>
        {components.map((item, key) => (
          <li key={key}>
            <h3>
              <Link to={item.name} id={item.name}>{item.name}</Link>
            </h3>
          </li>
        ))}
      </ul>
      <hr />
      <div>
        <Switch>
          {components.map((item, key) => (
            <Route key={key} path={'/' + item.name} exact={true} component={item} />
          ))}
        </Switch>
      </div>
    </div>
  );
}
