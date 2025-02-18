

namespace pizzaInheritanceOOP {

  type CrustT = 'thin' | 'stuffed' | 'gluten-free'
  type SauceT = 'tomato' | 'Creamy'

  class Pizza {
    constructor(
      size?: number,
      crust?: CrustT,
      sauce?: SauceT,
      toppings?: []
    ) {}
    prepare() { console.log('Preparing...') }
    bake() { console.log('Baking...') }
    ready() { console.log('Ready!') }
  }

  // Problem: Repeating the methods - Not D.R.Y.
  class Salad {
    constructor(
      size: number,
      dressing: string
    ) { }
    prepare() { console.log('Preparing...') }
    toss() { console.log('tossing...') }
    ready() { console.log('Ready!') }
  }


  class StuffedCrustPizza extends Pizza {
    stuff() { console.log('stuffing the crust...') }
  }

  class ButteredCrustPizza extends Pizza {
    butter() { console.log('Buttering the crust...') }
  }

  // Problema: Repeating methods - Not DRY
  class StuffedButteredCrustPizza extends Pizza {
    stuff() { console.log('stuffing the crust...') }
    butter() { console.log('Buttering the crust...') }
  }



  const myPizza = new StuffedButteredCrustPizza()
  myPizza.stuff()
  myPizza.butter()



}
