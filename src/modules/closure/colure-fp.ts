// Lexical scope defines how variables names are resolved in nested functions.
// Nested (child) functions have access to the scope of their parent functions.
// this is often confused with closure, but lexical scope is only one part of closure.

/* *
* W3Schools:
* "A closure is a function having access to the parent scope,
* even after the parent function has closed."
* */

namespace closureFp {

  // global scope
  let globalValue = 1

  const parentFn = () => {
    // local scope
    let parentValue = 2
    console.log('(parentFn) globalValue:', globalValue)
    console.log('(parentFn) parentValue:', parentValue)

    return (num: number) => {
      // block or function scope
      let childValue = 10
      parentValue = num + parentValue
      console.log('(childFn) globalValue:', globalValue)
      console.log('(childFn) parentValue:', parentValue)
      console.log('(childFn) childValue:', childValue)
      return parentValue
    }
  }


  const childFunction = parentFn()
  console.log('childFunction(100) return:', childFunction(100))
  console.log('childFunction(100) return:', childFunction(100))
  console.log('parentFn()(500) return:', parentFn()(500))
  console.log('parentFn()(500) return:', parentFn()(500))
  // this is a good way to create private variables managed by child functions.
  // design patterns like Singleton can be made in this way.

}
