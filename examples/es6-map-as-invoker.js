/* @flow */
import { log } from '../utils/log';
// same as default export
import { invokeReduce } from '../src/main';

log('Begin InvokeIf es6-map Test');

const M = new Map([
  [true, () => log('one')],
  [() => true, () => log('two')],
  [() => false, () => log('three')],
]);

function one() {
  log('Running Example One');
  return invokeReduce(M, M, M);
}

log('Example One Result: \n', one());

/*
  +1.5705    703277657.929938     Begin InvokeIf es6-map Test
  +1.4101    703277659.340068     Running Example One
  +0.4058    703277659.745834     one
  +0.0771    703277659.822968     two
  +0.0704    703277659.893387     one
  +0.0333    703277659.926737     two
  +0.0431    703277659.969805     one
  +0.0341    703277660.003915     two
  +0.0231    703277660.026982     Example One Result:
   [
    703277659.745834,
    703277659.822968,
    703277659.893387,
    703277659.926737,
    703277659.969805,
    703277660.003915
  ]
*/
