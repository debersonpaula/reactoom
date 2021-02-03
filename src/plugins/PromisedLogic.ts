import { Subject } from 'rxjs';
import { IBasePromiseLogic } from 'src/interfaces/IBasePromiseLogic';

export class PromisedLogic<T, E> implements IBasePromiseLogic<T, E> {
  isCompleted = false;
  isFailed = false;
  isLoading = false;
  isFinished = false;
  response?: T = undefined;
  error?: E = undefined;

  /**
   * contains the object of response
   * trigger everytime with the completed event
   */
  responseAsync = new Subject<T>();

  /**
   * contains the object of error
   * trigger everytime with the failed event
   */
  errorAsync = new Subject<E>();

  /**
   * trigger everytime with the finished event
   */
  finishAsync = new Subject<E>();

  public request(requestPromise: Promise<T>): void {
    this.loading();
    requestPromise.then(this.completed).catch(this.failed).finally(this.finished);
  }

  public reset = (): void => {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = false;
    this.response = undefined;
    this.error = undefined;
  };

  protected loading = (): void => {
    this.isLoading = true;
    this.isCompleted = false;
    this.isFailed = false;
    this.isFinished = false;
    this.response = undefined;
    this.error = undefined;
  };

  protected completed = (promiseResponse: T): void => {
    this.isLoading = false;
    this.isCompleted = true;
    this.isFailed = false;
    this.response = promiseResponse;
    this.error = undefined;
    this.completedAsync();
  };

  protected failed = (promiseError: E): void => {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = true;
    this.response = undefined;
    this.error = promiseError;
    this.failedAsync();
  };

  protected finished = (): void => {
    this.isFinished = true;
    this.finishedAsync();
  };

  private completedAsync = () => {
    this.responseAsync.next(this.response);
  };

  private failedAsync = () => {
    this.errorAsync.next(this.error);
  };

  private finishedAsync = () => {
    this.finishAsync.next();
  };
}
