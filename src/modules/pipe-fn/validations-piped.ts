import { decorators } from './decorators'



const validationsPiped = () => {

  const sentence = 'My name is Gabriel Lima, and I am 34 years old.'

  const splitOnSpace = (value: string) => value.split(' ')
  const count = (value: string[]) => value.length

  const wordCount = decorators().pipe(
    splitOnSpace,
    count
  )
  console.log('wordCount():', wordCount(sentence))


  // Combine Processes: Check for palindrome
  const pal1 = 'taco cat'
  const pal2 = 'Dave'
  //const pal2 = 'UFO tofu'

  const split = (val: string) => val.split('')
  const reverse = (val: string[]) => val.reverse()
  const join = (val: string[]) => val.join('')
  const lower = (val: string) => val.toLowerCase()

  const normalizeWord = decorators().pipe(
    splitOnSpace,
    join,
    lower
  )

  const normalizeAndReverse = decorators().pipe(
    normalizeWord,
    split,
    reverse,
    join,
    lower
  )

  if (normalizeWord(pal1) === normalizeAndReverse(pal1)) console.log('pal1 is a palindrome')
  else console.log('pal1 is NOT a palindrome')

  if (normalizeWord(pal2) === normalizeAndReverse(pal2)) console.log('pal2 is a palindrome')
  else console.log('pal2 is NOT a palindrome')


  const isString = (val: unknown): string | false => {
    if (typeof val === 'string') return val
    return false
  }
  const minLen = (val: string | false, n: number): string | false => {
    console.log('(minLen) val:', val)
    if (typeof val === 'string' && val.length >= n) return val
    return false
  }
  const maxLen = (val: string | false, n: number): string | false => {
    if (typeof val === 'string' && val.length <= n) return val
    return false
  }

  const validName = decorators().pipe(
    isString,
    (v: string) => minLen(v, 3),
    (v: string) => maxLen(v, 8)
  )

  console.log('validName:', validName('Gabriel'))

}

validationsPiped()
