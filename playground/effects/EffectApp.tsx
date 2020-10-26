import React, { useEffect } from 'react';
import { useModelContext } from 'reactoom';
import { EffectModel } from './EffectModel';

export function EffectApp(): JSX.Element {
  const effectContext = useModelContext(EffectModel);

  useEffect(() => {
    effectContext.start();
  }, []);

  return <div>Message = {effectContext.message}</div>;
}
