'use strict';

/**
 * #################
 * ## Ejercicio 2 ##
 * #################
 *
 * Crea una función que reciba una altura y dibuje una figura
 * como la que sigue:
 *
 *      1
 *      12
 *      123
 *      1234
 *      12345
 *
 */

// Creamos la función.
const createFigure = (height) => {
    // Variable que almacenará el contenido de cada línea.
    let line = '';

    // Bucle que se repite tantas veces como "height".
    for (let i = 1; i <= height; i++) {
        // Agregamos el contenido a la línea.
        line += i;

        // Mostramos por consola el contenido de la línea.
        console.log(line);
    }
};

// Llamamos a la función.
createFigure(5);
