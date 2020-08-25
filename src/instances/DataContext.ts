import { Context } from './Context';
import { IType } from '../interfaces/IType';
import { EventRelay } from '../tools/EventRelay';

export class TDataContext {
  private _contexts: Context[] = [];
  private _eventRelay = new EventRelay();

  /**
   * Find compatible Context or create one if not exists
   * @param classFn Context Class
   */
  public find(classFn: IType<unknown>): Context {
    let context = this._contexts.find((item) => item.isCompatible(classFn));

    // create new context if not exists
    if (!context) {
      context = new Context(classFn, this._eventRelay);
      this._contexts.push(context);
    }

    return context;
  }

  /**
   * Get Events Relay of the dispatcher
   * Any actions dispatched will trigger the observer
   * and will sent information about the action dispatched.
   */
  public get events(): EventRelay {
    return this._eventRelay;
  }
}

export const DataContext = new TDataContext();
