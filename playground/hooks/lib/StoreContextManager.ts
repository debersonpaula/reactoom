import { createContext, Context } from 'react';

const _data: StoreContextManager[] = [];

export class StoreContextManager {
  private _context: Context<unknown>;
  private _name: string;

  constructor(name: string) {
    this._context = createContext(null);
  }

  public get name() {
    return this._name;
  }

  public get context() {
    return this._context;
  }
}

export function createStoreContextManager(name: string): StoreContextManager {
  console.log('createStoreContextManager');

  let contextManager = _data.find((item) => item.name === name);
  if (!contextManager) {
    contextManager = new StoreContextManager(name);
    _data.push(contextManager);
  }
  return contextManager;
}
