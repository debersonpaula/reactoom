// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Dispatcher action
 */
export interface IAction {
  /**
   * Name of Property
   */
  methodName: string;
  /**
   * Arguments
   */
  args: unknown[];
}
