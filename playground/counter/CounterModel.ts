export class CounterModel {
  count = 0;

  add(): void {
    this.count++;
  }

  del(): void {
    this.count--;
  }
}
