const invokeIf = (...tests) => tests.forEach(
  ([ test, fn, ...rest ]) => {
    if ( typeof test === 'function' ) { test = test() }
    if ( test ) { fn() ; rest.length > 0 && invokeIf(...rest) }
  }
)

export default invokeIf