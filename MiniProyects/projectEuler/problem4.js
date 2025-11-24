//A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 \times 99. Find the largest palindrome made from the product of two 3-digit numbers.

function isPalindrome ( num ) {
  const str = num.toString();
  return str === str.split( '' ).reverse().join( '' );
}
function largestPalindromeProduct () {
  let maxPalindrome = 0;
  for ( let i = 10; i < 100; i++ )
  {
    for ( let j = 10; j < 100; j++ )
    {
      const product = i * j;
      if ( isPalindrome( product ) && product > maxPalindrome )
      {
        maxPalindrome = product;
      }
    }
  }
  return maxPalindrome;
}
console.log( largestPalindromeProduct() );