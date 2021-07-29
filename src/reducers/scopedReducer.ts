import { IReducerAction } from '../interfaces/IReducerAction';

export function scopedReducer(_: unknown, action: IReducerAction): unknown {
  return action.payload;
}
