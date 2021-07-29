import { useContext, useEffect } from 'react';
import { IType } from '../interfaces/IType';
import { StateContext } from '../context/StateContext';
import { ReactoomContext } from '../context/ReactoomContext';
import { IReducerAction } from '../interfaces/IReducerAction';

export function useReactoomSingleton<T>(classFn: IType<T>): T {
  const className = classFn.name;
  const context = useContext(ReactoomContext);
  const state = context[className];
  let stateContext: StateContext;

  if (!state) {
    const dispatcher: React.Dispatch<IReducerAction> = (action) => {
      context.___dispatcher({
        className,
        ...action,
      });
    };
    stateContext = new StateContext(classFn, dispatcher);
  }

  useEffect(() => {
    if (stateContext) {
      stateContext.dispatchInitialState();
    }
  }, []);

  return (state as T) || (stateContext.state as T);
}
