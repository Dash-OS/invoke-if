/* @flow */
import { log } from '../utils/log';
import { invokeAny } from '../src/main';

log('Begin InvokeIf Invoke-Any Tests');

const INVOKE_TESTS = [
  [true, () => log('one')],
  [true, () => log('two')],
  [false, () => log('three')],
  [true, () => log('four')],
];

function one() {
  log('Running Example One (invokeReduce / default)');
  return invokeAny(...INVOKE_TESTS);
}

log('Example One Result: \n', one());

/*
  +107.7342  708010937.150938     Begin InvokeIf Invoke-Any Tests
  +1.3446    708010938.495524     Running Example One (invokeAny)
  +0.4764    708010938.971957     one
  +0.1193    708010939.091213     two
  +0.1080    708010939.199258     four
  +0.0420    708010939.24125      Example One Result:
   [ 708010938.971957, 708010939.091213, 708010939.199258 ]
*/
