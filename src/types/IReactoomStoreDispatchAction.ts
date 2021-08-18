import { IReactoomStoreReducerAction } from './IReactoomStoreReducerAction';

export interface IReactoomStoreDispatchAction<T> extends IReactoomStoreReducerAction<T> {
  name: string;
}
