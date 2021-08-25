import 'reflect-metadata';
import { IMetaData } from '../interfaces/IMetaData';

const METAKEY_ACTION = Symbol('METAKEY_ACTION');
export type IActionlData = IMetaData;
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Define a action to be dispatched thru the provider.
 * @param config Options to define a name for the action.
 * If not defined, the name of the method will be used instead.
 */
export const Action = (config?: Partial<{ name: string }>): MethodDecorator => {
  return (target, propertyKey) => {
    const data: IActionlData = {
      objectName: propertyKey.toString(),
      name: config?.name || propertyKey.toString(),
    };

    // define metadata if not exists
    let actions: IActionlData[];
    if (!Reflect.hasMetadata(METAKEY_ACTION, target)) {
      actions = [];
      Reflect.defineMetadata(METAKEY_ACTION, actions, target);
    } else {
      actions = Reflect.getMetadata(METAKEY_ACTION, target);
    }

    actions.push(data);
  };
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getActionsData(target: unknown): IActionlData[] {
  return Reflect.getMetadata(METAKEY_ACTION, target);
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
