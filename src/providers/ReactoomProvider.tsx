import React from 'react';
import { ReactoomContext } from '../context/ReactoomContext';
import { ReactoomStore } from '../store/ReactoomStore';

export const ReactoomProvider: React.FC<Props> = ({ children, store }) => {
  const [state, dispatcher] = React.useReducer(store.reducer, { store });
  return (
    <ReactoomContext.Provider value={{ ...state, dispatcher: dispatcher }}>
      {children}
    </ReactoomContext.Provider>
  );
};

type Props = {
  store: ReactoomStore;
};
