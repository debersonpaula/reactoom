import { PromisedLogic } from 'reactoom/plugins/PromisedLogic';

const promiseResolve = (label: string) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(label);
    }, 1500);
  });

const promiseReject = (errorMessage: string) =>
  new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(errorMessage);
    }, 1500);
  });

export class PromiseContext extends PromisedLogic<string, string> {
  getDone = (label: string): void => {
    this.request(promiseResolve(label));
  };

  getError = (label: string): void => {
    this.request(promiseReject(label));
  };
}
