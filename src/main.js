const invokeNext = (response, ...tests) => tests.forEach(
  ([ test, fn, ...rest]) => {
    if ( typeof test === 'function' ) { test = test(response) }
    if ( test ) { 
      const next = typeof fn === 'function'
        ? fn(response) 
        : fn
      if ( rest.length > 0 ) {
        return invokeNext(next, ...rest) 
      } else { return next }
    }
  }
)

const invokeIf = (...tests) => tests.forEach(
  ([ test, fn, ...rest ]) => {
    if ( typeof test === 'function' ) { test = test() }
    if ( test ) { 
      const response = typeof fn === 'function'
        ? fn()
        : fn
      if ( rest.length > 0 ) {
        return invokeNext(response, ...rest)
      } else { return response }
    }
  }
)

export default invokeIf