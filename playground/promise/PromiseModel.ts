export class PromiseModel {
  private _promise: Promise<string>;
  public status = Status.NotStarted;

  start(success: boolean) {
    if (this._promise) {
    }

    this.changeStatus(Status.Loading);

    this._promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve();
        } else {
          reject();
        }
      }, 1500);
    });

    this._promise
      .then(() => {
        this.changeStatus(Status.Completed);
      })
      .catch(() => {
        this.changeStatus(Status.Failed);
      });
  }

  public changeStatus(status: Status) {
    console.log('changeStatus', status);
    this.status = status;
  }
}

enum Status {
  NotStarted = 'Not Started',
  Loading = 'Loading',
  Completed = 'Completed',
  Failed = 'Failed',
}
