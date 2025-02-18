// High Order Functions

// Takes one or more functions as an argument
// or
// returns a function as result

import { fewPosts } from '../../shared/mock/posts'



/* fewPosts.forEach(post => {
  console.log(post)
}) */

const user1Posts = fewPosts.filter(post => {
  return post.userId === 1
})

console.log('user1Posts:', user1Posts)
