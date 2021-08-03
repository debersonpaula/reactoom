import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AsyncScopedContext from './scoped/AsyncScopedContext';
import IsolatedSingletonContext from './singleton/IsolatedSingletonContext';
import MultipleScopedContext from './scoped/MultipleScopedContext';
import MultipleSingletonContext from './singleton/MultipleSingletonContext';
import ScopedContext from './scoped/ScopedContext';
import SingletonContext from './singleton/SingletonContext';
import WithEffectContext from './scoped/WithEffectContext';
import WithEffectSingletonContext from './singleton/WithEffectSingletonContext';
import DepsContext from './deps/DepsContext';

export function Routes(): JSX.Element {
  const components = [
    ScopedContext,
    MultipleScopedContext,
    AsyncScopedContext,
    WithEffectContext,
    SingletonContext,
    WithEffectSingletonContext,
    MultipleSingletonContext,
    IsolatedSingletonContext,
    DepsContext,
  ];
  return (
    <div>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {components.map((item, key) => (
          <li key={key} style={{ marginRight: 32 }}>
            <h3>
              <Link to={item.name} id={item.name}>
                {item.name}
              </Link>
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
