import { IClassReducerAction } from '../interfaces/IClassReducerAction';
import { IReactoomContext } from '../interfaces/IReactoomContext';

export function singletonReducer(state: IReactoomContext, action: IClassReducerAction): IReactoomContext {
  return { ...state, [action.className]: action.payload };
}
