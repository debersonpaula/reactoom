import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Action, Model, ReactoomProvider, useSingleton } from '../src';
import { ReactoomStore } from '../src/store/ReactoomStore';

@Model()
class Model1 {
  count = 0;

  @Action()
  change() {
    this.count += 1;
  }
}

@Model()
class Model2 {
  constructor(private _model1: Model1) {}

  get countOne() {
    return this._model1.count;
  }

  changeOne() {
    this._model1.change();
  }
}

@Model()
class Model3 extends Model1 {
  @Action()
  doubleChange() {
    this.change();
    this.change();
  }
}

function Component() {
  const { count, change } = useSingleton(Model1);
  const { changeOne, countOne } = useSingleton(Model2);
  const model3 = useSingleton(Model3);

  return (
    <div>
      <p>Count = {count}</p>
      <button onClick={change}>change</button>

      <p>CountOne = {countOne}</p>
      <button onClick={changeOne}>changeOne</button>

      <p>CountModel3 = {model3.count}</p>
      <button onClick={model3.doubleChange}>changeModel3</button>
    </div>
  );
}

const store = new ReactoomStore();

describe('ReactoomProvider', () => {
  // -----------------------------------------------------------------------------------
  beforeEach(() => {
    render(
      <ReactoomProvider store={store}>
        <Component />
      </ReactoomProvider>,
    );
  });
  // -----------------------------------------------------------------------------------
  it('should render initial counter with 0', () => {
    expect(screen.getByText('Count = 0')).toBeTruthy();
    expect(screen.getByText('CountModel3 = 0')).toBeTruthy();
  });
  // -----------------------------------------------------------------------------------
  it('should simulate change and render count = 1 and CountModel3 = 0', async () => {
    const buttonChange = screen.getByText('change');
    fireEvent.click(buttonChange);
    expect(screen.getByText('Count = 1')).toBeTruthy();
    expect(screen.getByText('CountModel3 = 0')).toBeTruthy();
  });
  // -----------------------------------------------------------------------------------
  it('should simulate changeOne and render CountOne = 2 and CountModel3 = 0', async () => {
    const buttonChangeOne = screen.getByText('changeOne');
    fireEvent.click(buttonChangeOne);
    expect(screen.getByText('CountOne = 2')).toBeTruthy();
    expect(screen.getByText('CountModel3 = 0')).toBeTruthy();
  });
  // -----------------------------------------------------------------------------------
  it('should simulate changeModel3 and render CountModel3 = 2', async () => {
    const buttonChange = screen.getByText('changeModel3');
    fireEvent.click(buttonChange);
    expect(screen.getByText('CountModel3 = 2')).toBeTruthy();
  });
  // -----------------------------------------------------------------------------------
});
