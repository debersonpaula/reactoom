import { TDataContext } from '../../instances/DataContext';

export class DebugMapper {
  constructor(dataContext: TDataContext) {
    dataContext.events.subject.subscribe((event) => {
      console.log('event relay', event);
      if (event) {
        if (event.methodName) {
          console.debug(
            `ReactOOM - Dispatch
          - Action: ${event.classFn.name}.${event.methodName}
          - Args: `,
            event.args,
            `
          - Previous state`,
            event.previousState,
            `
          - Next state`,
            event.nextState,
          );
        } else {
          console.debug('ReactOOM - Creating Model:', event.classFn.name);
        }
      }
    });
  }
}
