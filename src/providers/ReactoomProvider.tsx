import React from 'react';
import { ReactoomContext } from '../context/ReactoomContext';
import { singletonReducer } from '../reducers/singletonReducer';

export const ReactoomProvider: React.FC = ({ children }) => {
  const [state, dispatcher] = React.useReducer(singletonReducer, {});
  return <ReactoomContext.Provider value={{ ...state, ___dispatcher: dispatcher }}>{children}</ReactoomContext.Provider>;
};
