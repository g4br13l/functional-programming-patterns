

namespace pizzaCompositionFP {

  type CrustT = 'thin' | 'stuffed' | 'gluten-free'
  type SauceT = 'tomato' | 'Creamy'
  type PizzaT = ReturnType<typeof createPizza>

  const prepare = () => {
    return { prepare: () => console.log('Preparing...') }
  }

  const bake = () => {
    return { bake: () => console.log('Baking...') }
  }

  const toss = () => {
    return { toss: () => console.log('Tossing...') }
  }

  const ready = () => {
    return { ready: () => console.log('Ready!') }
  }

  const stuff = () => {
    return { stuff: () => console.log('Stuffing the crust...') }
  }

  const butter = () => {
    return { butter: () => console.log('Buttering the crust...') }
  }

  const addToppingsBad = (pizza: PizzaT, toppings: string[]) => {
    toppings.forEach(topping => {
      pizza.toppings.push(topping) // mutation. It's bad for functional programming
    })
    return pizza
  }

  const addToppings = (pizza: PizzaT, toppings: string[]) => {
    return { ...pizza, toppings: toppings }
  }


  // Like Pizza object, but DRY
  const createPizza =
    (size?: number, crust?: CrustT, sauce?: SauceT, toppings: string[] = []) => {
    const pizza = {
      size: size,
      crust: crust,
      sauce: sauce,
      toppings: toppings
    }
    return {
      ...pizza,
      ...prepare(),
      ...bake(),
      ...ready()
    }
  }

  // Like Salad Object, but DRY
  const createSalad = (size?: number, dressing?: string) => {
    const salad = {
      size: size,
      dressing: dressing
    }
    return {
      ...salad,
      ...prepare(),
      ...toss(),
      ...ready()
    }
  }

  const createStuffedButterCrustPizza = (pizza: PizzaT) => {
    return {
      ...pizza, // like a super() method in OOP
      ...stuff(),
      ...butter()
    }
  }



  const myPizza = createPizza(1, 'thin', 'tomato')
  const anotherPizza = createStuffedButterCrustPizza(myPizza)// OR
  const gabrielPizza = createStuffedButterCrustPizza(createPizza(1, 'thin', 'tomato'))
  const gabrielSalad = createSalad(1, 'ranch')

  gabrielPizza.bake()
  gabrielPizza.stuff()
  gabrielSalad.prepare()

  // bad for FP
  /* const pizza2 = createPizza(2, 'stuffed', 'Creamy')
  console.log('pizza2 before (addToppingsBad):', pizza2)
  console.log('addToppingsBad:', addToppingsBad(pizza2, ['pepperoni']))
  console.log('pizza2 after (addToppingsBad):', pizza2) */ // Mutated! it's bad idea


  const pizza3 = createPizza(3, 'gluten-free', 'tomato')
  console.log('pizza3 before (addToppings):', pizza3)
  console.log('addToppingsBad:', addToppings(pizza3, ['pepperoni']))
  console.log('pizza3 after (addToppings):', pizza3)

}
