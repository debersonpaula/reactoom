import { IReducerAction } from '../interfaces/IReducerAction';
import { LogAction } from '../logger/ReactoomLogger';

export function scopedReducer(_: unknown, { payload, state, type }: IReducerAction): unknown {
  LogAction({
    payload,
    state,
    type,
    scope: 'useScoped',
  });

  return payload;
}
