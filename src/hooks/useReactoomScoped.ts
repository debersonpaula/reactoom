import { useReducer, useEffect } from 'react';
import { IType } from '../interfaces/IType';
import { StateContext } from '../context/StateContext';
import { scopedReducer } from '../reducers/scopedReducer';

export function useReactoomScoped<T>(classFn: IType<T>): T {
  const [state, dispatcher] = useReducer(scopedReducer, null);
  useEffect(() => {
    if (!state) {
      new StateContext(classFn, dispatcher);
    }
  }, []);
  return state ? (state as T) : ({} as T);
}
