import { useReducer, useEffect } from 'react';
import { IType } from '../interfaces/IType';
import { StateContext } from '../context/StateContext';
import { scopedReducer } from '../reducers/scopedReducer';

export function useReactoomScoped<T>(classFn: IType<T>): T {
  const [state, dispatcher] = useReducer(scopedReducer, null);
  let stateContext: StateContext;

  if (!state) {
    stateContext = new StateContext(classFn, dispatcher);
  }

  useEffect(() => {
    if (stateContext) {
      stateContext.dispatchInitialState();
    }
  }, []);

  return (state as T) || (stateContext.state as T);
}
