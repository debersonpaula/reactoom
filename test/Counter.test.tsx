import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { CounterApp } from '../playground/counter/CounterApp';

describe('CounterApp', () => {
  // -----------------------------------------------------------------------------------
  let wrapper: ReactWrapper;
  // -----------------------------------------------------------------------------------
  beforeEach(async () => {
    wrapper = mount(<CounterApp />);
  });
  // -----------------------------------------------------------------------------------
  afterEach(() => {
    wrapper.unmount();
  });
  // -----------------------------------------------------------------------------------
  it('should render initial counter with 0', () => {
    const counterText = wrapper.find('p[id="counter"]');
    expect(counterText.text()).toEqual('Counter = 0');
  });
  // -----------------------------------------------------------------------------------
  it('should simulate add (0+3) and render counter with 3', async () => {
    const counterAdd = wrapper.find('button[id="add"]');

    counterAdd.simulate('click');
    counterAdd.simulate('click');
    counterAdd.simulate('click');

    const counterText = wrapper.find('p[id="counter"]');
    expect(counterText.text()).toEqual('Counter = 3');
  });
  // -----------------------------------------------------------------------------------
  it('should simulate del (3-2) and render counter with 1', async () => {
    const counterDel = wrapper.find('button[id="del"]');

    counterDel.simulate('click');
    counterDel.simulate('click');

    const counterText = wrapper.find('p[id="counter"]');
    expect(counterText.text()).toEqual('Counter = 1');
  });
  // -----------------------------------------------------------------------------------
});
