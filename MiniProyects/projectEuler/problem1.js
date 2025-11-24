//If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
//Find the sum of all the multiples of 3 or 5 below 1000.

function obtenerDivisibles ( end, m1, m2 ) {
  const result = [];
  for ( let i = 1; i < end; i++ )
  {
    if ( i % m1 === 0 || i % m2 === 0 )
    {
      result.push( i )
    }
  }
  return result
}
console.log( obtenerDivisibles( 10, 3, 5 ) )