import { getModelData } from '../decorators/Model';
import { ReactoomStore } from '../store/ReactoomStore';
import { IType } from '../types/IType';

export class ReactoomStateHandler<T> {
  private _fn: IType<unknown>;
  private _className: string;
  private _name: string;
  private _instance: unknown;
  private _state: unknown;
  public _store: ReactoomStore;

  constructor(classFn: IType<T>, store: ReactoomStore) {
    const model = getModelData(classFn);
    if (!model) {
      throw Error(`This model ${classFn.name} does not have @Model decorator.`);
    }
    this._store = store;
    this._fn = classFn;
    this._className = model.objectName;
    this._name = model.name;
    // const deps = this._getDeps(model.deps, store);
    // this._instance = new classFn(...deps);

    // this._state = {};
    // this._dispatcher = dispatcher;
    // this._extractAllProperties();
    // this._extractAllActions();

    const instance = new classFn();
    
  }

  compareByClassType(target: IType<unknown>): boolean {
    return target === this._fn;
  }

  compareByClassName(className: string): boolean {
    return className === this._className;
  }
}
