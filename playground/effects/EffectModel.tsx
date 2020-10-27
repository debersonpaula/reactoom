export class EffectModel {
  message: string = null;

  start = (): void => {
    this.message = 'started';
  };
}
