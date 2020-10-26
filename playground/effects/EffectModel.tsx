export class EffectModel {
  message: string = null;

  start = () => {
    console.log('start');
    this.message = 'started';
  };
}
