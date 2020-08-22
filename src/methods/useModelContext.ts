import { DataContext } from '../instances/DataContext';
import { IType } from '../interfaces/IType';

export function useModelContext<T>(classFn: IType<T>): T {
  const context = DataContext.find(classFn);
  return context.state();
}
