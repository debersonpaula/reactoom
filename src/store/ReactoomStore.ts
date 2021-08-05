import { IReactoomContext } from '../interfaces/IReactoomContext';
import { IReducerAction } from '../interfaces/IReducerAction';
import { IType } from '../interfaces/IType';
import { LogAction } from '../logger/ReactoomLogger';
import { StateManagement } from '../state/StateManagement';

export class ReactoomStore {
  private _states: Record<string, StateManagement> = {};

  public useState = (
    classFn: IType<unknown>,
    dispatcher: React.Dispatch<IReducerAction>,
  ): unknown => {
    const className = classFn.name;
    let stateContext = this._states[className];
    if (!stateContext) {
      stateContext = new StateManagement(classFn, null, this);
      this._states[className] = stateContext;
    }
    stateContext._dispatcher = dispatcher;
    return stateContext.state;
  };

  public getState = (className: string): unknown => {
    const context = this._states[className];
    return context?.state;
  };

  public reducer = (state: IReactoomContext, action: IReducerAction): IReactoomContext => {
    LogAction({ ...action, scope: 'singletonReducer' });
    return { ...state };
  };
}

export function createStore(): ReactoomStore {
  return new ReactoomStore();
}
