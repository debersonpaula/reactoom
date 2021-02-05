import { PromisedLogic } from 'reactoom/plugins/PromisedLogic';
import http from 'axios';

export class HttpContext extends PromisedLogic<unknown, unknown> {
  getDone = (): void => {
    this.request(http.get('https://reqres.in/api/users?page=2'));
  };

  getError = (): void => {
    this.request(http.get('https://reqres.in/api/users/23'));
  };
}
