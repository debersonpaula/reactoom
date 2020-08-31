export interface IActionHandler {
  /**
   * Name of method
   */
  name: string;

  /**
   * Real method handler.
   * Will be stored for use in reducer
   */
  handler: (...args: unknown[]) => void;
}
