/* @flow */
import { log } from '../utils/log';
// same as default export
import { invokeReduce } from '../src/main';

log('Begin InvokeIf es6-map Test');

const M = new Map([['one', 'hello'], ['three', 'world'], ['four', '!']]);

function one() {
  log('Running Example One');
  return invokeReduce(
    [[() => M.has('one'), () => M.get('one')]],
    [[() => M.has('two'), () => M.get('two')]],
    [
      [() => M.has('three'), () => M.get('three')],
      [() => M.has('four'), () => M.get('four')],
    ],
  );
}

log('Example One Result: ', one());

/*
  +1.6699    694237004.773528     Begin InvokeIf es6-map Test
  +1.5251    694237006.298625     Running Example One
  +0.3528    694237006.651379     Example One Result:  [ 'hello', 'world', '!' ]
*/
