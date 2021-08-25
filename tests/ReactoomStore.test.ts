import '@testing-library/jest-dom';
import { ReactoomStore } from '../src/store/ReactoomStore';

interface ICount {
  count: number;
}

describe('ReactoomStore', () => {
  let store: ReactoomStore;
  const stateName = 'test';
  // -----------------------------------------------------------------------------------
  beforeEach(() => {
    store = new ReactoomStore();

    store.include<ICount>(stateName, { count: 0 }, (state, action) => {
      switch (action.type) {
        case 'add':
          return { count: state.count + 1 };
        case 'del':
          return { count: state.count - 1 };
        default:
          return state;
      }
    });
  });
  // -----------------------------------------------------------------------------------
  it('getState() should return count = 0', () => {
    expect(store.getState()).toStrictEqual({ test: { count: 0 } });
  });
  // -----------------------------------------------------------------------------------
  it('dispatch action "add" to and check state if count is 2', () => {
    store.dispatch<ICount>({ name: stateName, type: 'add' });
    store.dispatch<ICount>({ name: stateName, type: 'add' });
    expect(store.getState()).toStrictEqual({ test: { count: 2 } });
  });
  // -----------------------------------------------------------------------------------
  it('dispatch action "del" to and check state if count is -1', () => {
    store.dispatch<ICount>({ name: stateName, type: 'del' });
    expect(store.getState()).toStrictEqual({ test: { count: -1 } });
  });
  // -----------------------------------------------------------------------------------
});
