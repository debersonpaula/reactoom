import '@testing-library/jest-dom';
import { Action, Model } from '../src';
import { ReactoomStore } from '../src/store/ReactoomStore';

@Model({ name: 'COUNTER' })
export class CounterModel {
  count = 0;

  @Action({ name: 'ADD' })
  add(): void {
    this.count++;
  }

  @Action({ name: 'DEL' })
  del(): void {
    this.count--;
  }
}

describe('ReactoomStateHandler', () => {
  let store: ReactoomStore;
  // -----------------------------------------------------------------------------------
  beforeEach(() => {
    store = new ReactoomStore();
    store.addModel(CounterModel);
  });
  // -----------------------------------------------------------------------------------
  it('getState() should return count = 0', () => {
    const state = store.getState().COUNTER as CounterModel;
    expect(state.count).toStrictEqual(0);
  });
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
});
