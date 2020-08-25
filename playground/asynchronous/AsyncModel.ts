import { Observable, Subscription } from 'rxjs';

export class AsyncModel {
  public status = Status.NotStarted;
  public messages: string[] = [];

  private _subscription: Subscription;

  start(success: boolean): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }

    this.status = Status.Loading;

    const observable = new Observable<string>((sub) => {
      setTimeout(() => {
        if (success) {
          sub.next(`Sucess at ${new Date().toUTCString()}`);
        } else {
          sub.error(`Error at ${new Date().toUTCString()}`);
        }
      }, 2000);
    });

    this._subscription = observable.subscribe(
      (done) => {
        this.changeStatus(Status.Completed, done);
      },
      (error) => {
        this.changeStatus(Status.Failed, error);
      },
    );
  }

  cancel(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
    this.status = Status.Cancelled;
  }

  public changeStatus(status: Status, message: string): void {
    this.status = status;
    this.messages.push(message);
  }
}

enum Status {
  NotStarted = 'Not Started',
  Loading = 'Loading',
  Completed = 'Completed',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
}
