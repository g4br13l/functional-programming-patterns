

const orderCurried = () => {

  const addCustomer = (fn: any) => (...args: any[]) => {
    console.log('adding customer info...')
    return fn(...args)
  }

  const processOrder = (fn: any) => (...args: any[]) => {
    console.log(`processing order #${args[0]}`)
    return fn(...args)
  }

  let completeOrder = (...args: any[]) => {
    console.log(`Order #${[...args].toString()} completed.`)
  }

  completeOrder = processOrder(completeOrder)
  console.log('completeOrder:', completeOrder)
  completeOrder = addCustomer(completeOrder)
  completeOrder('100')


  // is is the same like:
  function addCustomer2(...args: any[]) {
    return function processOrder2(...args: any[]) {
      return function completeOrder2(...args: any[]) {
        // end
      }
    }
  }

}


orderCurried()
