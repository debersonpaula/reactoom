import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App } from '../playground/App';
import { CounterApp } from '../playground/counter/CounterApp';
import { AsyncApp } from '../playground/asynchronous/AsyncApp';

describe('Main Application Test', () => {
  // -----------------------------------------------------------------------------------
  let wrapper: ReactWrapper;
  // -----------------------------------------------------------------------------------
  beforeEach(async () => {
    wrapper = mount(<App />);
  });
  // -----------------------------------------------------------------------------------
  afterEach(() => {
    wrapper.unmount();
  });
  // -----------------------------------------------------------------------------------
  it('app should be mounted without errors', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  // -----------------------------------------------------------------------------------
  it('test route for CounterApp', async () => {
    const link = wrapper.find('a[id="CounterApp"]');
    expect(link.length).toEqual(1);

    link.first().simulate('click', { button: 0 });

    const component = wrapper.find(CounterApp);
    expect(component.exists()).toBeTruthy();
  });
  // -----------------------------------------------------------------------------------
  it('test route for AsyncApp', async () => {
    const link = wrapper.find('a[id="AsyncApp"]');
    expect(link.length).toEqual(1);

    link.first().simulate('click', { button: 0 });

    const component = wrapper.find(AsyncApp);
    expect(component.exists()).toBeTruthy();
  });
});
