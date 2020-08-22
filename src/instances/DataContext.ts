import { Context } from './Context';
import { IType } from '../interfaces/IType';

class TDataContext {
  private _contexts: Context[] = [];

  /**
   * Find compatible Context or create one if not exists
   * @param classFn Context Class
   */
  public find(classFn: IType<unknown>): Context {
    let context = this._contexts.find((item) => item.isCompatible(classFn));

    // create new context if not exists
    if (!context) {
      context = new Context(classFn);
      this._contexts.push(context);
    }

    return context;
  }
}

export const DataContext = new TDataContext();
