import React, { useEffect, useState } from 'react';
import { ReactoomContext } from '../context/ReactoomContext';
import { LogAction } from '../logger/ReactoomLogger';
import { ReactoomStore } from '../store/ReactoomStore';

export const ReactoomProvider: React.FC<Props> = ({ children, store }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = useState<any>({});

  useEffect(() => {
    const event = store.subscribe((action) => {
      LogAction({
        scope: 'useSingleton',
        payload: action.payload,
        type: action.type,
        state: action.name,
      });

      state[1](action);
    });

    return function cleanup() {
      event.unsubscribe();
    };
  }, []);

  return <ReactoomContext.Provider value={{ store }}>{children}</ReactoomContext.Provider>;
};

type Props = {
  store: ReactoomStore;
};
