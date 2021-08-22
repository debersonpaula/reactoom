import { useContext } from 'react';
import { IType } from '../types/IType';
import { ReactoomContext } from '../context/ReactoomContext';

export function useSingleton<T>(classFn: IType<T>): T {
  const { store } = useContext(ReactoomContext);
  let model = store.getModelByClassType(classFn);
  if (!model) {
    model = store.addModel(classFn);
  }
  return model.state;
}
