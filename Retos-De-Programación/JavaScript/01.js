/*
EJERCICIO:
- Crea ejemplos utilizando todos los tipos de operadores de tu lenguaje:
Aritméticos, lógicos, de comparación, asignación, identidad, pertenencia, bits...
(Ten en cuenta que cada lenguaje puede poseer unos diferentes)
Utilizando las operaciones con operadores que tú quieras, crea ejemplos
que representen todos los tipos de estructuras de control que existan
en tu lenguaje:
Condicionales, iterativas, excepciones...
Debes hacer print por consola del resultado de todos los ejemplos.

DIFICULTAD EXTRA (opcional):
Crea un programa que imprima por consola todos los números comprendidos
entre 10 y 55 (incluidos), pares, y que no son ni el 16 ni múltiplos de 3.

Seguro que al revisar detenidamente las posibilidades has descubierto algo nuevo.
 */

// Ejemplos de operadores:

// Operadores aritméticos
let suma = 5 + 3;
let resta = 10 - 7;
let multiplicacion = 4 * 2;
let division = 20 / 5;
let modulo = 10 % 3;
console.log( "Operadores aritméticos:", suma, resta, multiplicacion, division, modulo );

// Operadores lógicos
let and = true && false;
let or = true || false;
let not = !true;
console.log( "Operadores lógicos:", and, or, not );

// Operadores de comparación
let mayorQue = 10 > 5;
let menorQue = 5 < 10;
let igual = 5 == "5"; // Comparación no estricta
let estrictamenteIgual = 5 === 5; // Comparación estricta
console.log( "Operadores de comparación:", mayorQue, menorQue, igual, estrictamenteIgual );

// Operadores de asignación
let asignacion = 10;
asignacion += 5; // Suma y asigna
console.log( "Operadores de asignación:", asignacion );

// Operadores de identidad
let identidad = 5 === 5;
let noIdentidad = 5 !== "5";
console.log( "Operadores de identidad:", identidad, noIdentidad );

// Operadores de pertenencia (en arrays u objetos)
let array = [ 1, 2, 3 ];
let pertenece = array.includes( 2 );
console.log( "Operadores de pertenencia:", pertenece );

// Operadores a nivel de bits
let bitwiseAnd = 5 & 3;
let bitwiseOr = 5 | 3;
let bitwiseXor = 5 ^ 3;
console.log( "Operadores de bits:", bitwiseAnd, bitwiseOr, bitwiseXor );

// Ejemplos de estructuras de control:

// Condicionales
let numero = 10;
if ( numero > 5 )
{
    console.log( "El número es mayor que 5" );
} else
{
    console.log( "El número es menor o igual a 5" );
}

// Iterativas
for ( let i = 0; i < 5; i++ )
{
    console.log( "Iteración con for:", i );
}

let contador = 0;
while ( contador < 3 )
{
    console.log( "Iteración con while:", contador );
    contador++;
}

// Excepciones
try
{
    P
    let resultado = 10 / 0;
    if ( !isFinite( resultado ) )
    {
        throw new Error( "División por cero" );
    }
} catch ( error )
{
    console.log( "Excepción capturada:", error.message );
}

// DIFICULTAD EXTRA: Números entre 10 y 55, pares, no 16 ni múltiplos de 3
for ( let i = 10; i <= 55; i++ )
{
    if ( i % 2 === 0 && i !== 16 && i % 3 !== 0 )
    {
        console.log( "Número válido:", i );
    }
}