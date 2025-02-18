import { deepClone } from '../../shared/lib/deep-clone'



namespace decoratorPatternFp {

  type BankAccountT = {
    accountHolder: string
    balance: number
    cardNumber: number
    bank: string
  }

  const verifyBalance = () => {
    function verifyBalance(account: BankAccountT, value: number): boolean {
      console.log('verifying the Balance...')
      return (
        account?.balance !== undefined
        && value !== undefined
        && account.balance >= value
      )
    }
    return { verifyBalance }
  }

  const processPayment = () => {
    function processPayment(bayer: BankAccountT, seller: BankAccountT, value: number): boolean {
      console.log('Processing payment...')
      bayer.balance = bayer.balance - value
      seller.balance = seller.balance + value
      return true
    }
    return { processPayment }
  }

  // Decorator for non mutating function using shallow copy
  /* const processPaymentDecorator = (fn: Function) => {
    return (bayer: BankAccountT, seller: BankAccountT, value: number) => {
      const newBayer = { ...bayer }
      const newSeller = { ...seller }
      return fn(newBayer, newSeller, value)
    }
  } */

  // Decorator for non mutating function using deep copy
  const processPaymentDecorator =
    (fn: Function) => (bayer: BankAccountT, seller: BankAccountT, value: number) => {
      const newBayer = deepClone(bayer)
      const newSeller = deepClone(seller)
      return fn(newBayer, newSeller, value)
    }

  const createAccount = (userAccount: BankAccountT) => {
    return { ...(userAccount) }
  }

  const createPayment = (bayer: BankAccountT, seller: BankAccountT, value: number) => {
    const paymentData = { bayer, seller, value }
    return {
      ...paymentData,
      ...verifyBalance(),
      ...processPayment(),
    }
  }


  const paymentManager = () => {

    const gabrielAccount = createAccount({
      accountHolder: 'gabriel',
      bank: 'A',
      balance: 100,
      cardNumber: 123456
    })
    const rafaelAccount = createAccount({
      accountHolder: 'Rafael',
      bank: 'B',
      balance: 100,
      cardNumber: 123456
    })
    console.log('gabrielAccount:', gabrielAccount)
    console.log('rafaelAccount:', rafaelAccount)

    const payment = createPayment(gabrielAccount, rafaelAccount, 50)
    if (!payment.verifyBalance(gabrielAccount, payment.value)) {
      console.log('Insufficient balance!')
    }
    else {
      // Mutating - Bad Idea
      /* console.log(
        'processPayment:',
        payment.processPayment(gabrielAccount, rafaelAccount, payment.value)
      ) */
      const processPaymentDec = processPaymentDecorator(payment.processPayment)
      console.log(
        'processPayment:',
        processPaymentDec(gabrielAccount, rafaelAccount, payment.value)
      )
    }
    console.log('after payment gabrielAccount:', gabrielAccount)
  }

  paymentManager()

}
