import { useEffect, useContext } from 'react';
import { IType } from '../interfaces/IType';
import { StateContext } from '../context/StateContext';
import { ReactoomContext } from '../context/ReactoomContext';
import { IReducerAction } from '../interfaces/IReducerAction';

export function useReactoomSingleton<T>(classFn: IType<T>): T {
  const className = classFn.name;
  const context = useContext(ReactoomContext);
  const state = context[className];

  useEffect(() => {
    if (!state) {
      const dispatcher: React.Dispatch<IReducerAction> = (action) => {
        context.___dispatcher({
          className,
          ...action,
        });
      };
      new StateContext(classFn, dispatcher);
    }
  }, []);
  return state ? (state as T) : ({} as T);
}
