import { IClassReducerAction } from './IClassReducerAction';

export interface IReactoomContext {
  ___dispatcher?: React.Dispatch<IClassReducerAction>;
  [className: string]: unknown;
}
