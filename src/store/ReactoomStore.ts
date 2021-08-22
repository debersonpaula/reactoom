/* eslint-disable @typescript-eslint/no-explicit-any */
import { IReactoomContext } from '../interfaces/IReactoomContext';
import { IReactoomStoreDispatchAction } from '../types/IReactoomStoreDispatchAction';
import { IReducerAction } from '../interfaces/IReducerAction';
import { IType } from '../types/IType';
import { LogAction } from '../logger/ReactoomLogger';
import { StateManagement } from '../state/StateManagement';
import { TDispatchCallback } from '../types/TDispatchCallback';
import { TReducerCallback } from '../types/TReducerCallback';
import { ReactoomStateHandler } from '../state/ReactoomStateHandler';
import { Subject, Subscription } from 'rxjs';

export class ReactoomStore {
  private _state: Record<string, unknown> = {};
  private _reducers: Record<string, TReducerCallback<any>> = {};
  private _handlers: ReactoomStateHandler<any>[] = [];
  private _eventRelay = new Subject<IReactoomStoreDispatchAction<any>>();

  // -----------------------------------------------------
  // --- PURE STATE HANDLERS -----------------------------
  // -----------------------------------------------------

  public getState(): Record<string, unknown> {
    return this._state;
  }

  public dispatch<T>(action: IReactoomStoreDispatchAction<T>): void {
    const name = action.name;
    const reducer = this._reducers[name];
    if (reducer) {
      const state = this._state[name];
      const result = reducer(state, action);
      this._state[name] = result;
      this._runListeners(action);
    } else {
      console.error(`There is no reducer with this name "${name}" in the store `);
    }
  }

  public subscribe(listener: TDispatchCallback<any>): Subscription {
    return this._eventRelay.subscribe(listener);
  }

  public include<T = any>(name: string, initialState: T, reducer: TReducerCallback<T>): void {
    this._state[name] = initialState;
    this._reducers[name] = reducer;
  }

  // -----------------------------------------------------
  // --- MODEL STATE HANDLERS ----------------------------
  // -----------------------------------------------------

  /**
   * Add Model class to Store
   * @param classFn ClassType
   */
  public addModel<T>(classFn: IType<T>): ReactoomStateHandler<T> {
    let handler = this.getModelByClassType(classFn);
    if (!handler) {
      handler = new ReactoomStateHandler(classFn, this);
      this._handlers.push(handler);
    }
    return handler;
  }

  /**
   * Get the State Handler of the Model by ClassType
   * @param classFn ClassType
   * @returns ReactoomStateHandler
   */
  public getModelByClassType<T>(classFn: IType<T>): ReactoomStateHandler<T> {
    return this._handlers.find((item) => item.compareByClassType(classFn));
  }

  /**
   * Get the State Handler of the Model by class name
   * @param name Class Name
   * @returns
   */
  public getModelByClassName<T>(name: string): ReactoomStateHandler<T> {
    return this._handlers.find((item) => item.compareByClassName(name));
  }

  private _runListeners(action: IReactoomStoreDispatchAction<any>) {
    this._eventRelay.next(action);
  }

  // old one
  // TODO: remove old methods
  private _states: Record<string, StateManagement> = {};
  public useState = (
    classFn: IType<unknown>,
    dispatcher: React.Dispatch<IReducerAction>,
  ): unknown => {
    const className = classFn.name;
    let stateContext = this._states[className];
    if (!stateContext) {
      stateContext = new StateManagement(classFn, null, this);
      this._states[className] = stateContext;
    }
    stateContext._dispatcher = dispatcher;
    return stateContext.state;
  };

  public getContextStateByName = <T>(name: string): T => {
    const context = this._states[name];
    return context?.state;
  };

  public reducer = (state: IReactoomContext, action: IReducerAction): IReactoomContext => {
    LogAction({ ...action, scope: 'singletonReducer' });
    return { ...state };
  };
}

export function createStore(): ReactoomStore {
  return new ReactoomStore();
}
