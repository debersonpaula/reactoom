# Reactoom

Are u tired to create a lot of files with constants, actions, dispatchers and reducers?

**Reactoom** is the solution to ease your life by abstracting all react/redux logics with understable architecture.

Based on library **exredux**, this package use decorators to create Models, Actions, Dependencies and much more.

[![NPM](https://nodei.co/npm/reactoom.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/reactoom)

## Install

```bash
# install ExRedux
npm i -S reactoom

# or

npm i reactoom
yarn add
```

## Setup tsconfig and babelrc

Include support for decorators in the tsconfig.json file:

```js
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

ExRedux uses Babel 7.x as base for transpilation/building and should be included the plugins below in the _.babelrc_ file.
Consider these itens as firts in the plugins list and in the same order that appears below:

```js
"presets": [
  "@babel/react",
  "@babel/typescript",
  ["@babel/env", { "modules": false }]
],
"plugins": [
  "babel-plugin-transform-typescript-metadata",
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ["@babel/plugin-proposal-class-properties", { "loose": true }],
  "@babel/plugin-proposal-object-rest-spread"
],
```

---

## Concept

This package is based in the common MVVM principles to control the activities in the frontend.

Any action of the flow is build on Reactoom Models and were dispatched thru useSingleton/useScoped hooks to the Components.

---

## Models

The logic starts with the Model.

The _Model_ it's a simple class with properties and methods. And values that was set in the properties, acts as initial store for the reducer.

The reducer name will be the same as the class name.
Or the name can be defined in the parameter name of model.

Basically, the Model is only a class:

```ts
import { Model } from 'reactoom';

@Model()
export class CounterModel {
  counter = 0;
}
```

---

## Actions

The _Action_ it's a method decorator and acts as dispatcher for the decorated method.

Any method decored will be replaced by dispatcher function that emits an action with the name of method as type and the result of the original function, will be the payload to be stored in the reducer.

```ts
import { Model, Action } from 'reactoom';

@Model({ name: 'COUNTER' })
export class CounterModel {
  counter = 0;

  @Action add() {
    this.counter += 1;
  }

  @Action del(): void {
    this.counter -= 1;
  }
}
```

The name of action also can be defined in the Action parameters

```ts
@Action({ name: 'ADD' })
add() {
  this.counter += 1;
}
```

---

## State change guideline

Methods without decorate changes the state only in the class and will not be dispatched to the redux store.
But can be used to calculate or change something until some point, and after that, call a decorated action to dispatch it to the store.

```ts
@Model()
export class AvailabilityModel {
  // change state internally only
  changeSomething() {
    this.stateData = 'something';
  }

  // change state internally
  // and dispatch it to the store and components
  @Action()
  changeAndDispatch() {
    this.stateData = 'something changed';
  }
}
```

---

## Provider and Hooks

Instead using Provider from _react-redux_, use **ReactoomProvider** directly from **reactoom**.
It's already provide encapsulation for the React contexts.

Use hook **useSingleton** from reactoom, to get connection with all the properties and methods from the model.

```tsx
import React from 'react';
import { createStore, ReactoomProvider, useSingleton } from 'reactoom';
import { CounterModel } from '../models/CounterModel';

const SingletonContextComponent = () => {
  const counter = useSingleton(CounterModel);
  return (
    <div>
      <h3>SingletonContext</h3>
      <p>Count = {counter.count}</p>
      <button onClick={counter.add}>add</button>
      <button onClick={counter.del}>del</button>
    </div>
  );
};

const store = createStore();

const SingletonContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <SingletonContextComponent />
    </ReactoomProvider>
  );
};
```

---

## Dependency Injection

To inject a model into another model, just declare it directly in the constructor.
The reactoom provider will bind the property from the store by injecting the state from the injected instance of that model.

The injected model should be instantiate first, by using the _useSingleton_ hook before the model that uses the injected model.

```ts
@Model()
class DepOneModel {
  count = 0;

  @Action()
  increment(): void {
    this.count++;
  }
}

@Model()
class DepTwoModel {
  count = 0;

  constructor(public depOne: DepOneModel) {}

  @Action()
  increment(): void {
    this.count++;
    this.depOne.increment();
  }
}

const DepsContextApp: React.FC = () => {
  const counterOne = useSingleton(DepOneModel);
  const counterTwo = useSingleton(DepTwoModel);

  return (
    <div>
      <h3>DepsContext</h3>

      <p>DepOneModel Count = {counterOne.count}</p>
      <button onClick={counterOne.increment}>add model one</button>

      <p>DepTwoModel Count = {counterTwo.count}</p>
      <button onClick={counterTwo.increment}>add model two</button>
    </div>
  );
};

const store = createStore();

const DepsContext: React.FC = () => {
  return (
    <ReactoomProvider store={store}>
      <DepsContextApp />
    </ReactoomProvider>
  );
};
```

In case if the injected models should not be started thru useSingleton, the store has the property to pre-load models inside the store structure.

This property will load any model at the start of the provider.

```ts
const store = createStore({ models: [DepOneModel, DepTwoModel] });
```

---

## Async Actions

Async methods can be use inside the actions.

In this case, the state change will be trigger only after the finish of the Promise.

```ts
function asyncCounter(value: number) {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
}

@Model()
export class AsyncCounterModel {
  count = 0;

  @Action()
  async add(): Promise<void> {
    this.count = await asyncCounter(this.count + 1);
  }

  @Action()
  async del(): Promise<void> {
    this.count = await asyncCounter(this.count - 1);
  }
}
```

---

## Sample

The sample project is available in the source https://github.com/debersonpaula/reactoom. Just install dependencies and run with `npm start`.

---

## License

[MIT](LICENSE)
