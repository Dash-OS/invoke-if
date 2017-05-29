# invoke-if

Extremely simple micro-package to invoke arrays whos first element returns 
truthy.  A nice way to clean up situations with lots of if/else logic.

Each element passed to `invokeIf` is an array.  If the first element is truthy, 
the second element is called.  If the given array has more than 2 keys then it 
continues parsing the next elements until a false value is encountered. 

### Installation

```
yarn add invoke-if
```

**or**

```
npm install --save invoke-if
```

### Simple Example

```js
import invokeIf from 'invoke-if'

invokeIf(
  [ 
    true, () => console.log(1), 
    true, () => console.log(2), 
    false,  () => console.log(3),
    true, () => console.log(4)
  ],
  [
    true, () => console.log(5)
  ]
)
// 1 2 5 -- since we encounter false at the 3rd predicate/fn pair we move to the
//          next element of invokeIf.

```