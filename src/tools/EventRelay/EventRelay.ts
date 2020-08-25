import { IType } from '../../interfaces/IType';
import { BehaviorSubject } from 'rxjs';

export class EventRelay {
  private _enabled = true;
  private _messager = new BehaviorSubject<IEventRelay>(undefined);

  public addContext(classFn: IType<unknown>): void {
    if (this._enabled) {
      this._messager.next({ classFn });
    }
  }

  public addEvent(classFn: IType<unknown>, methodName: string, args: unknown[], previousState: unknown, nextState: unknown): void {
    if (this._enabled) {
      this._messager.next({ classFn, methodName, args, previousState, nextState });
    }
  }

  public get subject(): BehaviorSubject<IEventRelay> {
    return this._messager;
  }

  public toggleEvents(value: boolean): void {
    this._enabled = value;
  }
}

interface IEventRelay {
  classFn: IType<unknown>;
  methodName?: string;
  args?: unknown[];
  previousState?: unknown;
  nextState?: unknown;
}
