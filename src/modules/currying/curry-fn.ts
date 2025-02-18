// currying function


const curryFn = () => {


  const buildSandwich = (ingredient1: string) => {
    return (ing2: string) => {
      return (ing3: string) => {
        return `${ingredient1}, ${ing2}, ${ing3}`
      }
    }
  }
  console.log(
    'sandwich:',
    buildSandwich('bacon')('lettuce')('tomato')
  )



  const buildSammy =
    (ing1: string) => (ing2: string) => (ing3: string) =>
    `${ing1}, ${ing2}, ${ing3}`

  console.log(
    'sammy:',
    buildSammy('turkey')('cheese')('bread')
  )



  const mult = (a: number, b: number) => a * b
  const curriedMult =
    (a: number) => (b: number) => a * b

  console.log('mult:', mult(2, 3))
  console.log('curriedMult:', curriedMult(2)(3))


}

curryFn()
