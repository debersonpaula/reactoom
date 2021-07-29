import { IReducerAction } from './IReducerAction';

export interface IClassReducerAction extends IReducerAction {
  className: string;
}
