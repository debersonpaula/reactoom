import React from 'react';
import ScopedContext from './ScopedContext';

const MultipleScopedContext: React.FC = () => {
  return (
    <div>
      <h3>MultipleScopedContext sample:</h3>
      <ScopedContext />
      <ScopedContext />
      <ScopedContext />
    </div>
  );
};

export default MultipleScopedContext;
