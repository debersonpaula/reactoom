import { Action, Model } from '../../src';

@Model()
export class AsyncLogsModel {
  messages: string[] = [];

  addAsyncLog(): void {
    setTimeout(() => {
      this.addLog();
    }, 1000);
  }

  @Action()
  addLog(): void {
    this.messages.push(new Date().toISOString());
  }
}
