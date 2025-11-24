//2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder. What is the smallest positive number that is evenly divisible with no remainder by all of the numbers from 1 to 20?

function calculateGreatestCommonDivisor ( a, b ) {
  while ( b )
  {
    [ a, b ] = [ b, a % b ];
  }
  return a;
}

function leastCommonMultiple ( a, b ) {
  return ( a * b ) / calculateGreatestCommonDivisor( a, b );
}

function smallestMultiple ( limit ) {
  let multiple = 1;
  for ( let i = 2; i <= limit; i++ )
  {
    multiple = leastCommonMultiple( multiple, i );
  }
  return multiple;
}
console.log( smallestMultiple( 20 ) );