/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { IType } from '../interfaces/IType';
import { IMetaData } from '../interfaces/IMetaData';

const METAKEY_MODEL = Symbol('METAKEY_MODEL');
export interface IModelData extends IMetaData {
  deps: string[];
  classFn: IType<unknown>;
}
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorates the class for model usage and
 * acts as state for the provider.
 * @param config Options to define a name for the state.
 * If not defined, the name of the class will be used instead.
 */
export const Model = (config?: Partial<{ name: string }>): ClassDecorator => {
  return (target) => {
    const types = Reflect.getMetadata('design:paramtypes', target) || [];
    const data: IModelData = {
      objectName: target.name,
      name: config?.name || target.name,
      deps: types.map((item: any) => item.name),
      classFn: target as any,
    };
    Reflect.defineMetadata(METAKEY_MODEL, data, target);
  };
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getModelData(target: IType<unknown>): IModelData | undefined {
  return Reflect.getMetadata(METAKEY_MODEL, target);
}
