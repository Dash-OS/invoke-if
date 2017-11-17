/* @flow */
import { log } from '../utils/log';
import invokeIf from '../src/main';

log('Begin InvokeIf Basic Tests');

const INVOKE_TESTS = [
  [
    [true, () => log('one')],
    [true, () => log('two')],
    [false, () => log('three'), () => log('three failed')],
    [false, () => log('four')],
  ],
];

function one() {
  log('Running Example One (invokeReduce / default)');
  return invokeIf(...INVOKE_TESTS);
}

log('Example One Result: \n', one());

/*
  +2.6129    706497316.197735     Begin InvokeIf Basic Tests
  +1.3767    706497317.574476     Running Example One (invokeReduce / default)
  +0.4022    706497317.976717     one
  +0.0674    706497318.044109     two
  +0.0615    706497318.105562     three failed
  +0.0310    706497318.136584     Example One Result:
   [ 706497317.976717, 706497318.044109, 706497318.105562 ]
*/
