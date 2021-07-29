import React from 'react';
import SingletonContext from './SingletonContext';

const IsolatedSingletonContext: React.FC = () => {
  return (
    <div>
      <h3>IsolatedSingletonContext</h3>
      <br />
      <SingletonContext />
      <SingletonContext />
    </div>
  );
};

export default IsolatedSingletonContext;
