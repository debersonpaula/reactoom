import React from 'react';
import { ReactoomProvider } from '../../src';
import { SingletonContextComponent } from './SingletonContext';

const MultipleSingletonContext: React.FC = () => {
  return (
    <ReactoomProvider>
      <h3>MultipleSingletonContext</h3>
      <br />
      <SingletonContextComponent />
      <SingletonContextComponent />
    </ReactoomProvider>
  );
};

export default MultipleSingletonContext;
