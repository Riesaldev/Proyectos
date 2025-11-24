'use strict';

/**
 * ##################
 * ## Ejercicio 14 ##
 * ##################
 *
 * Crea una función `countWords` que reciba un string y devuelva un objeto
 * donde cada propiedad sea una palabra que aparece en el string, y su valor
 * la cantidad de veces que aparece.
 *
 * Por ejemplo, para el string "Hola mundo, hola universo, mundo mundo":;
 *
 *  {
 *      hola: 2,
 *      mundo: 3,
 *      universo: 1
 *  }
 *
 */

function countWords(str) {
    // Convertimos el string en un array.
    const wordsArr = str.replaceAll(',', '').toLowerCase().split(' ');

    // Objeto vacío donde agregaremos las propiedades.
    const result = {};

    // Recorremos el array.
    for (const value of wordsArr) {
        if (value in result) {
            // Si existe la propiedad, incrementamos el valor en 1.
            result[value]++;
        } else {
            // Si no existe la creamos y asignamos como valor el 1.
            result[value] = 1;
        }
    }

    // Retornamos el objeto resultante.
    return result;
}

// Llamamos a la función anterior y le pasamos el argumento.
console.log(countWords('Hola mundo, hola universo, mundo mundo'));
