/*
  Oficial Definition of Recursion:
  In computer science, recursion is a method of solving a problem
  where the solution depends on solutions to smaller instances of the same problem.

  Unofficial definition of Recursion:
  Any situation where you do something, and depending on the results, you might do it again.

  recursion occurs when a function calls itself.
 */



const recursion = () => {

  // iterator
  const countToThree = (num: number = 1) => {
    while (num <= 3) {
      console.log('(countToThree while) num:', num)
      num++
    }
  }
  countToThree()
  /* recursive functions have 2 parts:
  *   1- the recursive call to the function
  *   2- at least one condition to exit */


  const countToThreeRecursive = (num: number = 1) => {
    if (num > 3) return
    console.log('(countToThreeRecursive while) num:', num)
    num++
    countToThreeRecursive(num)
  }
  countToThreeRecursive()

  /* Use recursion when you want:
  *  1- Less code
  *  2- Elegant code (aka pleasing to look at)
  *  3- Increased readability */
  /* Not use recursion when:
  *  1- Critical performance needs
  *  2- Need debug easily
  *  3- Is the readability improved? */

  

}

recursion()
