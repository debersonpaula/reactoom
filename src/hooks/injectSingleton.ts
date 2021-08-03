import { IType } from '../interfaces/IType';
import { ReactoomDependency } from '../store/ReactoomDependency';

export function injectSingleton<T>(classFn: IType<T>): T {
  const dep: unknown = new ReactoomDependency(classFn);
  return dep as T;
}
