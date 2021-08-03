import React from 'react';
import { IType } from '../interfaces/IType';
import { IReducerAction } from '../interfaces/IReducerAction';

export class StateContext {
  private _fn: IType<unknown>;
  private _className: string;
  private _instance: unknown;
  private _state: unknown;
  public _dispatcher: React.Dispatch<IReducerAction>;

  constructor(classFn: IType<unknown>, dispatcher?: React.Dispatch<IReducerAction>) {
    this._fn = classFn;
    this._className = classFn.name;
    this._instance = new classFn();
    this._extractAllProperties();
    if (dispatcher) {
      this._dispatcher = dispatcher;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get state(): any {
    return this._state;
  }

  dispatchInitialState(): void {
    this._dispatchState('INITIAL_STATE');
  }

  private _dispatchState(name: string) {
    const payload = { ...this.state };
    this._dispatcher({ name, payload, className: this._className });
  }

  private _extractAllProperties(): void {
    this._state = {};

    Object.getOwnPropertyNames(this._instance).forEach((propName) => {
      this._definePrimaryProp(propName);
      const property = this._instance[propName];
      if (typeof property === 'function' && !property.disabled) {
        this._defineMethodProp(propName);
      }
    });

    Object.getOwnPropertyNames(this._fn.prototype).forEach((propName) => {
      const objmethod = this._fn.prototype[propName];
      if (
        typeof objmethod === 'function' &&
        propName !== 'constructor' &&
        propName !== '__reactstandin__regenerateByEval'
      ) {
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
        throw new Error(
          `The property ${propName} is read only and can't be assigned outside the context.`,
        );
      },
    });
  }

  private _defineMethodProp(propName: string) {
    // keep real action handler
    const handler = this._instance[propName].bind(this._instance);
    const name = this._fn.name + '.' + propName;
    const _dispatchState = this._dispatchState.bind(this);
    // replace instance method to dispatcher
    this._instance[propName] = (...args: unknown[]) => {
      handler(...args);
      _dispatchState(name);
    };
  }
}
