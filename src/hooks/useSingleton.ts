import { useContext } from 'react';
import { IType } from '../types/IType';
import { ReactoomContext } from '../context/ReactoomContext';

export function useSingleton<T>(classFn: IType<T>): T {
  const { store, dispatcher } = useContext(ReactoomContext);
  return store.useState(classFn, dispatcher) as T;
}
