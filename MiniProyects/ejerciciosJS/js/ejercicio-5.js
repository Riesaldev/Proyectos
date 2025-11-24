'use strict';

/**
 * #################
 * ## Ejercicio 5 ##
 * #################
 *
 * Crea una función que reciba un parámetro que indique la altura de la pirámide y
 * confeccione una pirámide de asteriscos (*). Para una altura de 5, debería verse
 * por consola una figura como esta:
 *
 *      ____*
 *      ___***
 *      __*****
 *      _*******
 *      *********
 *
 * El caracter barra baja no hay que ponerlo, simplemente es para destacar que ahí
 * hay que poner espacios. ¿Cuántos espacios? Aaaah.... magia...
 *
 */

// Creamos la función.
const createFigure = (height) => {
    // Bucle principal. Este bucle se encarga de imprimir el contenido de cada línea.
    for (let line = 0; line < height; line++) {
        // Variable que almacenará el contenido de cada línea.
        let lineContent = '';

        // Bucle secundario. Este bucle se encargará de agregar los espacios de cada línea.
        for (let spaces = height - line; spaces > 0; spaces--) {
            lineContent += ' ';
        }

        // Bucle secundario. Este bucle se encargará de agregar los asteriscos de cada línea.
        for (let asterisk = line * 2 + 1; asterisk > 0; asterisk--) {
            lineContent += '*';
        }

        // Imprimimos el contenido de la línea actual.
        console.log(lineContent);
    }
};

// Llamamos a la función.
createFigure(5);
