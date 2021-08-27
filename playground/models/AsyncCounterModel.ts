import { Action, Model } from '../../src';

function asyncCounter(value: number) {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
}

@Model()
export class AsyncCounterModel {
  count = 0;

  @Action()
  async add(): Promise<void> {
    this.count = await asyncCounter(this.count + 1);
  }

  @Action()
  async del(): Promise<void> {
    this.count = await asyncCounter(this.count - 1);
  }
}
