export class CounterModel {
  count = 0;

  add = (): void => {
    this.count++;
  };

  del = (): void => {
    this.count--;
  };

  public get totalCount(): string {
    return 'Total = ' + this.count;
  }

  internalFunc(): string {
    return 'Total = ' + this.count;
  }
}
