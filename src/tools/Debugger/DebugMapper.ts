import { IType } from '../../interfaces/IType';

export class DebugMapper {
  private _contexts: DebugContext[] = [];
  private _enabled: boolean = false;

  constructor(enableDebug: boolean) {
    this._enabled = enableDebug;
  }

  public addContext(classFn: IType<unknown>) {
    // let context = this._contexts.find((item) => item.isCompatible(classFn));
    if (this._enabled) {
      const context = new DebugContext(classFn);
      this._contexts.push(context);
    }
  }
}

class DebugContext {
  private _fn: IType<unknown>;

  constructor(classFn: IType<unknown>) {
    this._fn = classFn;
  }

  public isCompatible(classFn: IType<unknown>): boolean {
    return this._fn === classFn;
  }
}
