/*
 * EJERCICIO:
 * Muestra ejemplos de todas las operaciones que puedes realizar con cadenas de caracteres
 * en tu lenguaje. Algunas de esas operaciones podrían ser (busca todas las que puedas):
 * - Acceso a caracteres específicos, subcadenas, longitud, concatenación, repetición,
 *   recorrido, conversión a mayúsculas y minúsculas, reemplazo, división, unión,
 *   interpolación, verificación...
 *
 * DIFICULTAD EXTRA (opcional):
 * Crea un programa que analice dos palabras diferentes y realice comprobaciones
 * para descubrir si son:
 * - Palíndromos
 * - Anagramas
 * - Isogramas
 */

// SOLUCIÓN:
// Acceso a caracteres específicos
let str = "Hola Mundo";
console.log( str[ 0 ] );
// Subcadenas
console.log( str.substring( 0, 4 ) );
// Longitud
console.log( str.length );
// Concatenación
console.log( str + "!" );
// Repetición
console.log( str.repeat( 3 ) );
// Recorrido
for ( let i = 0; i < str.length; i++ )
{
  console.log( str[ i ] );
}
// Conversión a mayúsculas y minúsculas
console.log( str.toUpperCase() );
console.log( str.toLowerCase() );
// Reemplazo
console.log( str.replace( "Mundo", "Mundial" ) );
// División
console.log( str.split( " " ) );
// Unión
console.log( str.split( " " ).join( "-" ) );
// Interpolación
let name = "Juan";
let age = 30;
console.log( `Mi nombre es ${ name } y tengo ${ age } años.` );
// Verificación
console.log( str.includes( "Mundo" ) );
console.log( str.startsWith( "Hola" ) );
console.log( str.endsWith( "Mundo" ) );
// DIFICULTAD EXTRA
// Palíndromos
function esPalindromo ( s ) {
  s = s.toLowerCase().replace( /[^a-z0-9]/g, "" );
  let reverso = s.split( "" ).reverse().join( "" );
  return s === reverso;
}
console.log( esPalindromo( "Anita lava la tina" ) );
console.log( esPalindromo( "Hola Mundo" ) );
// Anagramas
function sonAnagramas ( s1, s2 ) {
  let normalize = ( s ) => s.toLowerCase().replace( /[^a-z0-9]/g, "" ).split( "" ).sort().join( "" );
  return normalize( s1 ) === normalize( s2 );
}
console.log( sonAnagramas( "amor", "Roma" ) );
console.log( sonAnagramas( "Hola", "Mundo" ) );
// Isogramas
function esIsograma ( s ) {
  s = s.toLowerCase().replace( /[^a-z]/g, "" );
  let letras = new Set();
  for ( let i = 0; i < s.length; i++ )
  {
    if ( letras.has( s[ i ] ) )
    {
      return false;
    }
    letras.add( s[ i ] );
  }
  return true;
}
console.log( esIsograma( "Hola" ) );
console.log( esIsograma( "Mundo" ) );
console.log( esIsograma( "Anita" ) );
console.log( esIsograma( "Lava" ) );

