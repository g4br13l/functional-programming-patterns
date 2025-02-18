

// IIFE (Immediately Invoked Function Expression)

/* const privateCounter = (() => {
  let count = 0
  console.log(`initial value: ${count}`)
  return () => {
    count += 1
    console.log(count)
  }
})()

privateCounter()
privateCounter()
privateCounter() */



/* **************************** */

const credits = ((num: number) => {
  let credits = num
  console.log(`Initial credits value: ${credits}`)
  return () => {
    credits -= 1
    if (credits > 0) {
      console.log(`playing game, ${credits} credits remaining`)
    }
    else {
      console.log('not enough credits')
    }
  }
})(3)

credits()
credits()
credits()
