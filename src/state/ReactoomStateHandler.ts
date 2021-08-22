/* eslint-disable @typescript-eslint/no-explicit-any */
import { getActionsData } from '../decorators/Action';
import { getModelData } from '../decorators/Model';
import { extractInstanceProps } from '../helpers/extractInstanceProps';
import { ReactoomStore } from '../store/ReactoomStore';
import { IType } from '../types/IType';

export class ReactoomStateHandler<T> {
  private _fn: IType<unknown>;
  private _className: string;
  private _name: string;
  private _instance: unknown;
  private _state: any;
  public _store: ReactoomStore;

  constructor(classFn: IType<T>, store: ReactoomStore) {
    const model = getModelData(classFn);
    if (!model) {
      throw Error(`This model ${classFn.name} does not have @Model decorator.`);
    }
    // define base vars
    this._store = store;
    this._fn = classFn;
    this._className = model.objectName;
    this._name = model.name;

    // create initial instance
    const deps = this._getDeps(model.deps);
    this._instance = new classFn(...deps);

    // assign state
    this._state = {};
    this._extractAllProperties();
    this._extractAllActions();

    // define reducer
    this._store.include(this._name, this._state, (state) => state);
  }

  public compareByClassType(target: IType<unknown>): boolean {
    return target === this._fn;
  }

  public compareByClassName(className: string): boolean {
    return className === this._className;
  }

  get state(): T {
    return this._state;
  }

  private _getDeps(deps: string[]) {
    const args = [];
    if (this._store) {
      deps.forEach((item) => {
        const handler = this._store.getModelByClassName(item);
        args.push(handler.state);
      });
    }
    return args;
  }

  /**
   * Extract all values from instance
   */
  private _extractAllProperties(): void {
    const props = extractInstanceProps(this._instance);

    // assign all values to state
    props.values.forEach((propName) => {
      this._definePrimaryProp(propName);
    });

    // assign all methods to state
    props.methods.forEach((propName) => {
      this._definePrimaryMethod(propName);
    });
  }

  private _extractAllActions(): void {
    const actions = getActionsData(this._instance);
    if (actions) {
      actions.forEach((item) => {
        this._defineAction(item.objectName, item.name);
      });
    }
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

  private _definePrimaryMethod(propName: string) {
    Object.defineProperty(this._state, propName, {
      enumerable: true,
      get: () => this._getProperty(propName),
      set: () => {
        throw new Error(
          `The property ${propName} is read only and can't be assigned outside the context.`,
        );
      },
    });
  }

  private _getProperty(propName: string) {
    const property = this._instance[propName];
    return typeof property === 'function' ? property.bind(this._instance) : property;
  }

  private _defineAction(objectName: string, actionName: string) {
    // keep real action handler
    const handler = this._instance[objectName];
    const _dispatchState = this._dispatchState.bind(this);
    // replace instance method to dispatcher
    this._instance[objectName] = (...args: unknown[]) => {
      handler.call(this._instance, ...args);
      _dispatchState(actionName);
    };
  }

  private _dispatchState(method: string) {
    const name = this._name;
    const type = this._name + '.' + method;
    const payload = { ...this.state };

    this._store.dispatch({
      name,
      type,
      payload,
    });
  }
}
