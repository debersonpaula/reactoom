import React, { createContext, useContext } from 'react';
import { IType } from 'reactoom/interfaces/IType';
import { StoreContextManager, createStoreContextManager } from './lib/StoreContextManager';
// ------------------------------------------
// --- STORE COMPONENTS ---------------------
// ------------------------------------------
export class StoreProvider extends React.Component<IStoreProviderProps> {
  private _store: StoreContext;
  private _mounted: boolean;

  private _contextManager: StoreContextManager;

  constructor(props: IStoreProviderProps) {
    super(props);
    console.log('StoreProvider');
    // this._store = new StoreContext(this.handleUpdate);

    // props.contexts.forEach((itemClass) => {
    //   this._store.addClass(itemClass);
    // });

    this._contextManager = createStoreContextManager(props.name);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleUpdate = () => {
    console.log('StoreProvider.handleUpdate', this._id);
    if (this._mounted) {
      this.forceUpdate();
    }
  };

  render(): JSX.Element {
    console.log('StoreProvider.render');
    const context = this._contextManager.context;
    return (
      <context.Provider value={null}>
        {this.props.children}
        <button onClick={this.handleUpdate}>TESTE</button>
      </context.Provider>
    );
  }
}

interface IStoreProviderProps {
  name: string;
  contexts: IType<unknown>[];
}
// ------------------------------------------
// --- StoreContext -------------------------
// ------------------------------------------
const _internalStoreContextData: StoreContext[] = [];

class StoreContext {
  constructor(private forceUpdate: () => void) {
    console.log('StoreContext');
    _internalStoreContextData.push(this);
  }

  private _models: { [className: string]: ContextModel } = {};
  private _context = createContext(null);

  public addClass(classFn: IType<unknown>) {
    const className = classFn.name;
    this._models[className] = new ContextModel(classFn, this.forceUpdate);
  }

  public getContext() {
    return this._context;
  }

  public getContextModel(contextName: string): ContextModel {
    return this._models[contextName];
  }

  public existsContextModel(contextName: string): boolean {
    return this.getContextModel(contextName) !== undefined;
  }

  public getState(contextName: string) {
    return this.getContextModel(contextName)?.state;
  }

  public getStates() {
    const result = {};
    for (const key in this._models) {
      result[key] = this._models[key].state;
    }
    return result;
  }
}
// ------------------------------------------
// --- ContextModel -------------------------
// ------------------------------------------
class ContextModel {
  constructor(classFn: IType<unknown>, private forceUpdate: () => void) {
    console.log('ContextModel');
    this._instance = new classFn();
    this._extractAllProperties();
  }

  public get state() {
    return this._state;
  }

  private _instance: unknown;
  private _state: unknown;

  private _extractAllProperties(): void {
    this._state = {};

    const propNames = Object.getOwnPropertyNames(this._instance);

    console.log('propNames', propNames);

    propNames.forEach((propName) => {
      if (typeof this._instance[propName] === 'function') {
        this._defineMethodProp(propName);
      } else {
        this._definePrimaryProp(propName);
      }
    });

    // const constructorProps = Object.getOwnPropertyNames(this._fn.prototype);

    // constructorProps.forEach((key) => {
    //   if (key !== 'constructor' && key !== '__reactstandin__regenerateByEval') {
    //     this._definePrimaryProp(key);
    //   }
    // });
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
    this._state[propName] = (...args: unknown[]) => {
      this._instance[propName](...args);
      this.forceUpdate();
    };
  }
}
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
export function useContextStore<T>(classFn: IType<T>): T {
  // const className = classFn.name;
  // const contextModel = _internalStoreContextData.find((item) => item.existsContextModel(className));
  // if (contextModel) {
  //   useContext(contextModel.getContext());
  //   return contextModel.getState(className) as T;
  // } else {
  //   throw Error(`This context '${className} does not exists.'`);
  // }
}
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
