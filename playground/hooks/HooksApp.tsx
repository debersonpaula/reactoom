import React, { ReactNode, useState, createContext, useContext, useCallback } from 'react';
import { StoreProvider, useContextStore } from './store-concept';
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
class CounterModel {
  count = 0;

  add = () => {
    this.count++;
  };

  del = () => {
    this.count--;
  };
}
// ------------------------------------------
const counterInstance = new CounterModel();
const CounterContext = createContext(counterInstance);
// ------------------------------------------
function useGeneratedState() {
  console.log('useGeneratedState');
  const [state, setState] = useState(counterInstance);

  const handleAdd = () => {
    console.log('handleAdd');
    counterInstance.add();
    setState({ ...counterInstance });
  };

  const handleDel = () => {
    console.log('handleDel');
    counterInstance.del();
    setState({ ...counterInstance });
  };

  const newState = JSON.parse(JSON.stringify(state)) as CounterModel;
  newState.add = handleAdd;
  newState.del = handleDel;

  return newState;
}
// ------------------------------------------
// ------------------------------------------
function CounterProvider(props: IProps) {
  console.log('CounterProvider');
  const state = useGeneratedState();
  return <CounterContext.Provider value={state}>{props.children}</CounterContext.Provider>;
}
interface IProps {
  children: ReactNode;
}

class AltCounterProvider extends React.Component<IAltCounterProviderProps> {
  state: CounterModel;

  constructor(prop: IAltCounterProviderProps) {
    super(prop);
    console.log('AltCounterProvider');

    const flushState = (model: CounterModel) => {
      const newState = JSON.parse(JSON.stringify(model)) as CounterModel;
      newState.add = handleAdd;
      newState.del = handleDel;
      return newState;
    };

    const handleAdd = () => {
      console.log('AltCounterProvider.handleAdd');
      counterInstance.add();
      this.setState(flushState(counterInstance));
    };

    const handleDel = () => {
      console.log('AltCounterProvider.handleDel');
      counterInstance.del();
      this.setState(flushState(counterInstance));
    };

    // const newState = JSON.parse(JSON.stringify(state)) as CounterModel;
    // newState.add = handleAdd;
    // newState.del = handleDel;
    this.state = flushState(counterInstance);
  }
  render() {
    return <CounterContext.Provider value={this.state}>{this.props.children}</CounterContext.Provider>;
  }
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAltCounterProviderProps {}
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
function CounterComponent() {
  const state = useContext(CounterContext);
  return (
    <div>
      CounterComponent: {state.count}
      <button onClick={state.add}>ADD</button>
      <button onClick={state.del}>DEL</button>
    </div>
  );
}

function CounterBasicComponent() {
  const state = useGeneratedState();
  return (
    <div>
      CounterBasicComponent: {state.count}
      <button onClick={state.add}>ADD</button>
      <button onClick={state.del}>DEL</button>
    </div>
  );
}

function CounterContextStoreComponent() {
  const state = useContextStore(CounterModel);
  console.log('CounterContextStoreComponent', state);
  return (
    <div>
      {/* CounterContextStoreComponent: {state.count}
      <button onClick={state.add}>ADD</button>
      <button onClick={state.del}>DEL</button> */}
    </div>
  );
}
// ------------------------------------------
// ------------------------------------------
// ------------------------------------------
export function HooksApp(): JSX.Element {
  return (
    <div>
      <h3>Hooks App</h3>
      {/* <CounterProvider>
        <CounterComponent />
      </CounterProvider>
      <CounterProvider>
        <CounterComponent />
      </CounterProvider>
      <CounterBasicComponent /> */}

      {/* <AltCounterProvider>
        <CounterComponent />
      </AltCounterProvider> */}

      <StoreProvider contexts={[CounterModel]} name="Provider1">
        <CounterContextStoreComponent />
      </StoreProvider>
    </div>
  );
}
