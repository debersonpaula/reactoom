export interface IActionHandler {
  name: string;
  handler: (...args: unknown[]) => void;
}
