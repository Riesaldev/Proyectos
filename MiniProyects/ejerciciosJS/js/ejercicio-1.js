'use strict';

/**
 * #################
 * ## Ejercicio 1 ##
 * #################
 *
 * Crea una función que reciba un parámetro que indique la altura de la pirámide y
 * confeccione una pirámide de asteriscos (*). Para una altura de 5, debería verse
 * por consola una figura como esta:
 *
 *      *
 *      **
 *      ***
 *      ****
 *      *****
 *
 */

// Creamos la función.
function createFigure(height) {
    // Variable que almacenará el contenido de cada línea.
    let line = '';

    // Bucle que se repite tantas veces como "height".
    for (let i = 0; i < height; i++) {
        // Agregamos un asterisco a la línea.
        line += '*'; // line = line + '*'

        // Imprimimos por consola el contenido de la línea.
        console.log(line);
    }
}

// Llamamos a la función.
createFigure(5);
