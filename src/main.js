const invokeIf = (...tests) => tests.forEach(
  ([ test, fn, ...rest ]) => {
    if ( test ) { fn() ; rest.length > 0 && invokeIf(...rest) }
  }
)

export default invokeIf