/* @flow */
import { log } from '../utils/log';
import invokeIf, { invokeMap } from '../src/main';

log('Begin InvokeIf Multi-Invoke Tests');

const INVOKE_TESTS = [
  [
    [true, () => log('one')],
    [true, () => log('two')],
    [false, () => log('three')],
    [false, () => log('four')],
  ],
  [
    [() => true, () => log('five')],
    [() => 'true', () => log('six')],
    [() => 'seven', (arg: string) => log(arg)],
  ],
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
  +1.5743    695406726.602197     Begin InvokeIf Multi-Invoke Tests

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
