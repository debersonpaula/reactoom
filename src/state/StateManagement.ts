import { getActionsData } from '../decorators/Action';
import { getModelData } from '../decorators/Model';
import { extractInstanceProps } from '../helpers/extractInstanceProps';
import { IReducerAction } from '../interfaces/IReducerAction';
import { IType } from '../interfaces/IType';
import { ReactoomStore } from '../store/ReactoomStore';

export class StateManagement {
  private _fn: IType<unknown>;
  private _className: string;
  private _name: string;
  private _instance: unknown;
  private _state: unknown;
  public _dispatcher: React.Dispatch<IReducerAction>;
  public _store: ReactoomStore;

  constructor(
    classFn: IType<unknown>,
    dispatcher?: React.Dispatch<IReducerAction>,
    store?: ReactoomStore,
  ) {
    const model = getModelData(classFn);
    if (!model) {
      throw Error(`This model ${classFn.name} does not have @Model decorator.`);
    }
    this._store = store;
    this._fn = classFn;
    this._className = model.objectName;
    this._name = model.name;
    this._instance = new classFn();
    this._state = {};
    this._dispatcher = dispatcher;
    this._extractAllProperties();
    this._extractAllActions();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get state(): any {
    return this._state;
  }

  dispatchInitialState(): void {
    // this._dispatchState('INITIAL_STATE');
  }

  private _dispatchState(method: string) {
    const type = this._name + '.' + method;
    const payload = { ...this.state };
    this._dispatcher({ type, payload, state: this._name });
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
    console.debug('_extractMethods.actions', actions);
    actions.forEach((item) => {
      this._defineAction(item.objectName, item.name);
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

  private _definePrimaryMethod(propName: string) {
    Object.defineProperty(this._state, propName, {
      enumerable: true,
      get: () => this._instance[propName].bind(this._instance),
      set: () => {
        throw new Error(
          `The property ${propName} is read only and can't be assigned outside the context.`,
        );
      },
    });
  }

  private _defineAction(objectName: string, actionName: string) {
    // keep real action handler
    const handler = this._instance[objectName].bind(this._instance);
    // const name = this._fn.name + '.' + objectName;
    const _dispatchState = this._dispatchState.bind(this);
    // replace instance method to dispatcher
    this._instance[objectName] = (...args: unknown[]) => {
      handler(...args);
      _dispatchState(actionName);
    };
  }
}
