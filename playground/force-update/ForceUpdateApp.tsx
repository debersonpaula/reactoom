import React, { ReactNode, useState, createContext, useContext, useCallback } from 'react';
// ------------------------------------------
interface IProps {
  value?: string;
  children?: ReactNode;
}
// ------------------------------------------
// ------------------------------------------
function ChildWithProps(props: IProps) {
  console.log('ChildWithProps', props);
  const state = getContext();
  return (
    <div>
      {state.value}
      <br />
      {props.children}
    </div>
  );
}
// ------------------------------------------
// ------------------------------------------
class MasterComponent extends React.Component {
  handle = () => {
    Data.value = new Date().toISOString();
    this.forceUpdate();
  };

  render() {
    console.log('MasterComponent');
    return (
      <Context.Provider value={null}>
        <button onClick={this.handle}>CHANGE</button>
        <ChildWithProps />
        <ChildWithProps />
        <ChildWithProps>
          <ChildWithProps />
        </ChildWithProps>
      </Context.Provider>
    );
  }
}

const Data = { value: '' };
const Context = createContext(null);
function getContext() {
  useContext(Context);
  return Data;
}
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
export function ForceUpdateApp(): JSX.Element {
  return (
    <div>
      <h3>ForceUpdateApp</h3>
      <MasterComponent />
    </div>
  );
}
