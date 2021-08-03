let ENABLE_LOGS = false;

export function EnableLogs(): void {
  ENABLE_LOGS = true;
}

export function LogAction(options: ILogAction): void {
  if (ENABLE_LOGS) {
    console.debug('Dispatched:', options);
  }
}

interface ILogAction {
  type: string;
  name: string;
  payload: unknown;
  className: string;
}
