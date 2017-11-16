/* @flow */
import { log } from '../utils/log';
import invokeIf from '../src/main';

log('Begin InvokeIf Factory Invoke Tests');

let i = 0;

const INVOKE_TESTS = [
  () => {
    if (i % 2 === 0) {
      return new Map([
        [() => true, () => log('1.one')],
        [() => true, () => log('1.two')],
      ]);
    }
  },
  () => {
    if (i % 2 !== 0) {
      return [
        [() => true, () => log('2.one')],
        [() => true, () => log('2.two')],
      ];
    }
  },
];

function one() {
  log('Running Example One (invokeReduce / default)');

  return invokeIf(...INVOKE_TESTS);
}

log('Example One Result (Invoke 1): \n', one());

// increment and make it switch to the next
i += 1;

log('Example One Result (Invoke 2): \n', one());

/*
  +2.9549    704746553.772401     Begin InvokeIf Factory Invoke Tests

  +1.3972    704746555.16958      Running Example One (invokeReduce / default)
  +0.4530    704746555.622576     1.one
  +0.0723    704746555.694911     1.two
  +0.0871    704746555.782013     Example One Result (Invoke 1):
   [ 704746555.622576, 704746555.694911 ]

  +1.0982    704746556.880179     Running Example One (invokeReduce / default)
  +0.1117    704746556.991915     2.one
  +0.0584    704746557.050268     2.two
  +0.0394    704746557.089638     Example One Result (Invoke 2):
   [ 704746556.991915, 704746557.050268 ]
*/
