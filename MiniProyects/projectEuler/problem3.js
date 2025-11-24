//The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143.

function largestPrimeFactor ( n ) {
  let factor = 2;
  while ( n > 1 )
  {
    if ( n % factor === 0 )
    {
      n /= factor;
    } else
    {
      factor++;
    }
  }
  return factor;
}
console.log( largestPrimeFactor( 600851475143 ) );