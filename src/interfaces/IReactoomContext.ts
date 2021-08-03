import { ReactoomStore } from '../store/ReactoomStore';
import { IReducerAction } from './IReducerAction';

export interface IReactoomContext {
  dispatcher?: React.Dispatch<IReducerAction>;
  store?: ReactoomStore;
}
