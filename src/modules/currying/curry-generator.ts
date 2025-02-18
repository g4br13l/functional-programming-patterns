
const curryGenerator = () => {

  // Decorator pattern
  function curry(fn: Function) {
    return function curried(...args: any[]): any {
      if (fn.length !== args.length) {
        return curried.bind(null, ...args)
      }
      return fn(...args)
    }
  }

  const total = (a: number, b: number ,c: number) => a + b + c
  const curriedTotal = curry(total)
  const result = curriedTotal(2)(2)(2)
  console.log('result:', result)


  type ValidateConfigT = { minLen: number, maxLen: number }
  const validate = (value: string, config: ValidateConfigT): boolean => {
    const valueLen = value.length
    return valueLen >= config.minLen && valueLen <= config.maxLen
  }

  const curriedValidate = curry(validate)
  const validationRes = curriedValidate('gab')({
    minLen: 3,
    maxLen: 8
  } satisfies ValidateConfigT)
  console.log('validationRes:', validationRes)

}

curryGenerator()
