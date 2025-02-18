// Often uses pipe and compose = heigher order functions
// A higher order function is any function which takes a function as argument,
// and / or returns a function



import { decorators } from './decorators'



const pipeFunction = () => {

  // How  a "compose" function works:
  // Start with unary (one parameter) functions

  const add5 = (num: number) => num + 5
  const subtract3 = (num: number) => num - 3
  const multiplyBy5 = (num: number) => num * 5

  // Notice how the function execute from inside to outside (right to left)
  // it's not piped function
  const result = multiplyBy5(subtract3(add5(4)))
  console.log('result:', result)

  // composed
  const composedRes = decorators().compose(multiplyBy5, subtract3, add5)(4)
  console.log('composedRes:', composedRes)

  // piped
  const pipedRes = decorators().pipe(
    add5,
    subtract3,
    multiplyBy5
  )(4)
  //const pipedRes = decorators().pipe(multiplyBy5, subtract3, add5)(4)
  console.log('pipedRes:', pipedRes)

  // This is a "pointer free" style where you don't see the unary parameter passed
  // between each function
  // exemple with a 2nd parameter
  const divideBy = (divisor: number, num: number) => num / divisor
  const pipeRes2 = decorators().pipe(
    add5,
    subtract3,
    multiplyBy5,
    (res: number) => divideBy(2, res)
  )(5)
  console.log('pipeRes2:', pipeRes2)

  // Or you could curry the divideBy function for a custom unary function
  const divBy = (divisor: number) => (num: number) => num / divisor
  const divBy2 = divBy(2)
  const pipeRes3 = decorators().pipe(
    add5,
    subtract3,
    multiplyBy5,
    divBy2
  )(5)
  console.log('pipeRes3:', pipeRes3)

}

pipeFunction()
