import { TDataContext } from '../../instances/DataContext';

export class DebugMapper {
  constructor(dataContext: TDataContext) {
    dataContext.events.subject.subscribe((event) => {
      if (event) {
        if (event.methodName) {
          console.debug(
            `ReactOOM - Dispatch
          - Action: ${event.classFn.name}.${event.methodName}
          - Args: `,
            event.args,
            `
          - Previous state`,
            this.cleanState(event.previousState),
            `
          - Next state`,
            this.cleanState(event.nextState),
          );
        } else {
          console.debug('ReactOOM - Creating Model:', event.classFn.name);
        }
      }
    });
  }

  private cleanState(obj: unknown) {
    // return JSON.parse(JSON.stringify(obj));
    return obj;
  }
}
