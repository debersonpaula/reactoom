import { Action, Model } from '../../src';

@Model({ name: 'COUNTER' })
export class CounterModel {
  count = 0;

  subcount = {
    countPlus: 0,
  };

  @Action({ name: 'ADD' })
  add(): void {
    this.count++;
    this.subcount.countPlus = this.count * 2;
  }

  @Action({ name: 'DEL' })
  del(): void {
    this.count--;
    this.subcount.countPlus = this.count * 2;
  }
}
