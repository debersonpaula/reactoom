import { IReactoomStoreDispatchAction } from './IReactoomStoreDispatchAction';

export type TDispatchCallback<T> = (action: IReactoomStoreDispatchAction<T>) => void;
