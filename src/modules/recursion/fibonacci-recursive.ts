

// Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 etc...

const fibonacciRecursive = () => {

  const fibonacci = (num: number, nums: number[] = [0, 1]) => {
    while (num > 2) {
      const [secondLast, last] = nums.slice(-2)
      nums.push(secondLast + last)
      num -= 1
    }
    return nums
  }
  console.log('fibonacci():', fibonacci(6))


  const fibonacciRecursive = (num: number, nums: number[] = [0, 1]) => {
    if (num <= 2) return nums
    const [secondLast, last] = nums.slice(-2)
    const newNums = [...nums, secondLast + last]
    return fibonacciRecursive(num -1, newNums)
  }
  console.log('fibonacciRecursive():', fibonacciRecursive(6))


  const fibNumInPosition = (pos: number) => {
    if (pos <= 0) return 0
    const nums = [0, 1]
    for (let i = 2; i <= pos; i++) {
      const [secondLast, last] = nums.slice(-2)
      nums.push(secondLast + last)
    }
    return nums[pos]
  }
  console.log('fibNumInPosition():', fibNumInPosition(6))


  const fibNumInPosRecursive = (pos: number): number => {
    if (pos <= 1) return pos
    return fibNumInPosRecursive(pos -2) + fibNumInPosRecursive(pos -1)
  }
  console.log('fibNumInPosRecursive():', fibNumInPosRecursive(6))
  // OR
  const fibPosRec = // 1 line
    (pos: number): number => pos <= 1 ? pos : fibPosRec(pos -2) + fibPosRec(pos -1)
  console.log('fibPosRec():', fibPosRec(6))
}

fibonacciRecursive()
