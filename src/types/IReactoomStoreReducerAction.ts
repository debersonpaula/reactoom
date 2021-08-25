export interface IReactoomStoreReducerAction<T> {
  type: string;
  payload?: T;
}
