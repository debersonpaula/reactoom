export interface IReducerAction {
  /**
   * Name of the action
   */
  type: string;

  /**
   * Data
   */
  payload: unknown;

  /**
   * Name of the state
   */
  state: string;
}
