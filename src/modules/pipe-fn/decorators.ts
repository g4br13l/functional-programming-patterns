// Making our compose and pipe functions
// Note: Ramda.js and lodash libraries have their own built-in compose and pipe functions


export const decorators = () => {

  // the higher order function "reduce" takes a list of values
  // and applies a function to each of those values, accumulating a single result

  const compose = (...fns: Function[]) => {
    return (val: any) => {
      return fns.reduceRight((prev, fn) => fn(prev), val)
    }
  }

  const pipe = (...fns: Function[]) => {
    return (val: any) => {
      return fns.reduce((prev, fn) => fn(prev), val)
    }
  }

  return { compose, pipe }
}

decorators()
