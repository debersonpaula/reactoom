import { IReducerAction } from '../interfaces/IReducerAction';
import { LogAction } from '../logger/ReactoomLogger';

export function scopedReducer(_: unknown, action: IReducerAction): unknown {
  LogAction({ ...action, type: 'scopedReducer' });
  return action.payload;
}
