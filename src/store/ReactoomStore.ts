import { StateContext } from '../context/StateContext';
import { IReactoomContext } from '../interfaces/IReactoomContext';
import { IReducerAction } from '../interfaces/IReducerAction';
import { IType } from '../interfaces/IType';
import { LogAction } from '../logger/ReactoomLogger';

export class ReactoomStore {
  private _states: Record<string, StateContext> = {};

  public useState = (
    classFn: IType<unknown>,
    dispatcher: React.Dispatch<IReducerAction>,
  ): unknown => {
    const className = classFn.name;
    let stateContext = this._states[className];
    if (!stateContext) {
      stateContext = new StateContext(classFn);
      this._states[className] = stateContext;
    }
    stateContext._dispatcher = dispatcher;
    return stateContext.state;
  };

  public reducer = (state: IReactoomContext, action: IReducerAction): IReactoomContext => {
    LogAction({ ...action, type: 'singletonReducer' });
    return { ...state };
  };
}

export function createStore(): ReactoomStore {
  return new ReactoomStore();
}
