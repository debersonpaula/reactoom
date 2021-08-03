import { IType } from '../interfaces/IType';

export class ReactoomDependency {
  public classFn: IType<unknown>;
  constructor(classFn: IType<unknown>) {
    this.classFn = classFn;
  }
}
