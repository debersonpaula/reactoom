import { useReducer } from 'react';
import { IType } from '../types/IType';
import { scopedReducer } from '../reducers/scopedReducer';
import { StateManagement } from '../state/StateManagement';

export function useScoped<T>(classFn: IType<T>): T {
  const [state, dispatcher] = useReducer(scopedReducer, null);
  let stateContext: StateManagement;

  if (!state) {
    stateContext = new StateManagement(classFn, dispatcher);
  }

  return (state as T) || (stateContext.state as T);
}
