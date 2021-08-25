import { IReactoomStoreReducerAction } from './IReactoomStoreReducerAction';

export type TReducerCallback<T> = (state: T, action: IReactoomStoreReducerAction<T>) => T;
