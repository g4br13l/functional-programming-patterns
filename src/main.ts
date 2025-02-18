


function main() {

  // compose
  // A higher order function is any function witch takes a function as argument
  // and returns a function or both.
  // here's how compose function works:

  const add2 = (x: number) => x + 2
  const sub1 = (x: number) => x - 1
  const mult5 = (x: number) => x * 5

  // functions are executed from inside to outside (right to left)
  const res = mult5(sub1(add2(4)))
  console.log('res:', res)
  // this is not a compose function.

}



main()
