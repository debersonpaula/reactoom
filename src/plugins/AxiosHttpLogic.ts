import { AxiosResponse, AxiosError } from 'axios';
import { PromisedLogic } from './PromisedLogic';

export class AxiosHttpLogic<T> extends PromisedLogic<AxiosResponse<T>, AxiosError> {}
