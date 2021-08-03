// import React from 'react';
// import { act } from 'react-dom/test-utils';
// import { mount, ReactWrapper } from 'enzyme';
// import { AsyncApp } from '../playground/asynchronous/AsyncApp';

// describe('AsyncApp', () => {
//   // -----------------------------------------------------------------------------------
//   let wrapper: ReactWrapper;
//   // -----------------------------------------------------------------------------------
//   beforeEach(async () => {
//     jest.useFakeTimers();
//     wrapper = mount(<AsyncApp />);
//   });
//   // -----------------------------------------------------------------------------------
//   afterEach(() => {
//     wrapper.unmount();
//     jest.clearAllTimers();
//   });
//   // -----------------------------------------------------------------------------------
//   it('should render initial status with Not Started', () => {
//     const statusText = wrapper.find('p[id="status"]');
//     expect(statusText.text()).toEqual('Status = Not Started');
//   });
//   // -----------------------------------------------------------------------------------
//   it('should simulate success and render status with Completed', async () => {
//     const button = wrapper.find('button[id="success"]');

//     // simulate loading step
//     act(() => {
//       button.simulate('click');
//       jest.advanceTimersByTime(500);
//     });
//     let statusText = wrapper.find('p[id="status"]');
//     expect(statusText.text()).toEqual('Status = Loading');

//     // simulate completed step
//     act(() => {
//       jest.runAllTimers();
//     });

//     statusText = wrapper.find('p[id="status"]');
//     expect(statusText.text()).toEqual('Status = Completed');
//   });
//   // -----------------------------------------------------------------------------------
//   it('should simulate failure and render status with Failed', async () => {
//     const button = wrapper.find('button[id="failure"]');

//     // simulate loading step
//     act(() => {
//       button.simulate('click');
//       jest.advanceTimersByTime(500);
//     });
//     let statusText = wrapper.find('p[id="status"]');
//     expect(statusText.text()).toEqual('Status = Loading');

//     // simulate failed step
//     act(() => {
//       jest.runAllTimers();
//     });

//     statusText = wrapper.find('p[id="status"]');
//     expect(statusText.text()).toEqual('Status = Failed');
//   });
//   // -----------------------------------------------------------------------------------
//   it('should simulate cancel and render status with Cancelled', async () => {
//     const button = wrapper.find('button[id="cancel"]');

//     // simulate loading step
//     act(() => {
//       button.simulate('click');
//       // jest.advanceTimersByTime(500);
//     });
//     const statusText = wrapper.find('p[id="status"]');
//     expect(statusText.text()).toEqual('Status = Cancelled');
//   });
//   // -----------------------------------------------------------------------------------
// });
