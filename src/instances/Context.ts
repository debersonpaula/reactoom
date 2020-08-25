import React from 'react';
import { IType } from '../interfaces/IType';
import { IAction } from '../interfaces/IAction';
import { EventRelay } from '../tools/EventRelay';
import { IActionHandler } from '../interfaces/IActionHandler';

export class Context {
  private _fn: IType<unknown>;
  private _instance: unknown;
  private _state: unknown;
  private _actions: IActionHandler[] = [];
  private _dispatcher: React.Dispatch<IAction>;

  constructor(classFn: IType<unknown>, private _eventRelay: EventRelay) {
    this._fn = classFn;
    this._instance = new classFn();
    this._extractAllProperties();
    this._eventRelay.addContext(classFn);
  }

  /**
   * Compare if classFn is the same of the class of this Context
   * @param classFn
   */
  public isCompatible(classFn: IType<unknown>): boolean {
    return this._fn === classFn;
  }

  /**
   * Generate state reducer and dispatcher for all methods
   */
  public state<T>(): T {
    const [state, dispatcher] = React.useReducer(this._reducer, this._state);
    this._dispatcher = dispatcher;
    return state as T;
  }

  private _extractAllProperties(): void {
    this._state = {};
    this._dispatcher = () => null;

    Object.getOwnPropertyNames(this._instance).forEach((propName) => {
      this._definePrimaryProp(propName);
      if (typeof this._instance[propName] === 'function') {
        this._defineMethodProp(propName);
      }
    });

    Object.getOwnPropertyNames(this._fn.prototype).forEach((propName) => {
      const objmethod = this._fn.prototype[propName];
      if (typeof objmethod === 'function' && propName !== 'constructor' && propName !== '__reactstandin__regenerateByEval') {
        this._definePrimaryProp(propName);
        this._defineMethodProp(propName);
      }
    });
  }

  private _definePrimaryProp(propName: string) {
    Object.defineProperty(this._state, propName, {
      enumerable: true,
      get: () => this._instance[propName],
      set: () => {
        throw new Error(`The property ${propName} is read only and can't be assigned outside the context.`);
      },
    });
  }

  private _defineMethodProp(propName: string) {
    // create real action handler and add to actions list
    this._actions.push({ name: propName, handler: this._instance[propName] });
    // replace instance method to dispatcher
    this._instance[propName] = (...args: unknown[]) => {
      const payload: IAction = {
        methodName: propName,
        args,
      };
      this._dispatcher(payload);
    };
  }

  private _reducer = (state: unknown, action: IAction): unknown => {
    const actionHandler = this._actions.find((item) => item.name === action.methodName);
    if (actionHandler) {
      actionHandler.handler.call(this._instance, ...action.args);
      const nextState = Object.assign({}, this._state);
      this._eventRelay.addEvent(this._fn, action.methodName, action.args, state, nextState);
      return nextState;
    }

    throw new Error(`Method ${action.methodName} not found in this context [${this._fn.name}].`);
  };
}
