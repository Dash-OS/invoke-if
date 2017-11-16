# invoke-if

A dependency-free micro-package providing composable control-flow that works the
way we always wished `switch` would work. It evaluates groups of tests and
provides a pattern for if, if/and, if/else, if/then.

Each test that passes invokes that tests function or array of functions.
Optionally aggregates the results of the passing invokes to the caller.

## Installation

```
yarn add invoke-if
```

**or**

```
npm install --save invoke-if
```

## Flow Coverage

Proudly built with 100% Flow Coverage. Includes flow definitions so if you are
using flow, it will type-check for you.

## Breaking Update

Version 2.0 implements a change of the API for `invoke-if`. Previous versions
are not likely to work. These changes were done during perf tests when we
realized 90% speed improvements by slightly adjusting the data structure that
invoke-if operates upon.

## Simple Example

```js
/* @flow */
import { log } from '../utils/log';
import invokeIf, { invokeMap } from '../src/main';

log('Begin InvokeIf Basic Tests');

// Note that `log()` returns the result of performance.now()

const INVOKE_TESTS = [
  [
    [true, () => log('one')],
    [true, () => log('two')],
    [false, () => log('three')],
    [false, () => log('four')],
  ],
  new Map([
    [() => true, () => log('five')],
    [() => 'true', () => log('six')],
    [() => 'seven', (arg: string) => log(arg)],
  ]),
];

function one() {
  log('Running Example One (invokeReduce / default)');
  return invokeIf(...INVOKE_TESTS);
}

function two() {
  log('Running Example Two (invokeMap)');
  return invokeMap(...INVOKE_TESTS);
}

log('Example One Result: \n', one());

log('Example Two Result: \n', two());

/*
  +1.5743    695406726.602197     Begin InvokeIf Basic Tests

  +1.3778    695406727.980045     Running Example One (invokeReduce / default)
  +0.3265    695406728.306522     one
  +0.0703    695406728.376835     two
  +0.0808    695406728.457588     five
  +0.0625    695406728.520046     six
  +0.0531    695406728.573129     seven
  +0.0336    695406728.606769     Example One Result:
  [
    695406728.306522,
    695406728.376835,
    695406728.457588,
    695406728.520046,
    695406728.573129
  ]

  +1.2038    695406729.810552     Running Example Two (invokeMap)
  +0.0957    695406729.906205     one
  +0.0450    695406729.951161     two
  +0.0308    695406729.981922     five
  +0.0267    695406730.008638     six
  +0.0256    695406730.034196     seven
  +0.0245    695406730.058679     Example Two Result:
  [
    [ 695406729.906205, 695406729.951161 ],
    [ 695406729.981922, 695406730.008638, 695406730.034196 ]
  ]
*/
```

## Type Signatures

```js
export type $NonFunction = boolean | string | number | { [key: string]: * };

export type InvokeCheck<+A> = (() => A) | A;
export type InvokeFn<A> = (arg: A) => mixed;

export type Invoker<A> =
  | Array<InvokeFn<A> | $NonFunction>
  | (InvokeFn<A> | $NonFunction);

export type InvokeTest<A> = [InvokeCheck<A>, Invoker<A>];

export type FactoryFn<A> = () => void | InvokeTesters<A>;

export type InvokeTesters<A> =
  | Array<InvokeTest<A>>
  | Map<InvokeCheck<A>, Invoker<A>>
  | FactoryFn<A>;
```

## Module Exports

### invokeReduce (Function) (default, named)

The default export, reduces the results of the tests into a simple array of
results.

```js
declare function invokeReduce(...tests: Array<InvokeTesters<*>>): Array<mixed>;
```

### invokeMap (Function)

Instead of reducing and merging the responses together, `invokeMap` simply runs
the tests and maps the responses directly to the caller. The result is an array
of results which are a closer match to the original array.

```js
declare function invokeMap(...tests: Array<InvokeTesters<*>>): Array<mixed>;
```
