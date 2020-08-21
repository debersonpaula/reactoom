import React from 'react';
import { IType } from '../interfaces/IType';

export function Store(props: Partial<IStoreProps>): JSX.Element {
  return <>{props.children}</>;
}

interface IStoreProps {
  children: React.ReactNode;
  /**
   * List of Provider or Services that will be injected
   * in components and other services.
   *
   * Will generate a scoped state that not be persisted in memory
   * after caller destruction.
   */
  providers: IType<unknown>[];

  /**
   * List of Models that will be injected
   * in components and other services.
   */
  models: IType<unknown>[];
}
