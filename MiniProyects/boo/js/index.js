/**
 * #################
 * ## 👻 B O O 👻 ##
 * #################
 *
 * Haz que, cada segundo que pase, el div "boo" aparezca ubicado en una
 * posición aleatoria de la ventana y que el color del body cambie también
 * de forma aleatoria "rgb(?, ?, ?)".
 *
 * ¡Ojo! No dejes que Boo se salga de los márgenes de la ventana, debemos
 * poder ver a Boo sin hacer scroll en ningún momento.
 *
 * element.getBoundingClientRect() --> devuelve una serie de propiedades
 * del nodo seleccionado, entre ellas, la altura y el ancho del elemento.
 *
 * Bonus point --> haz que aparezcan más emojis acompañando a Boo. Para ello
 *                 deberás crear más divs y seleccionarlos a todos. Esto
 *                 requerirá a mayores que cambies cositas en el código.
 *
 */

'use strict';

// Importamos la función que genera un valor aleatorio entre 0 y 255.
import { randomValue } from './helpers.js';

// Seleccionamos el body.
const body = document.body;

// Seleccionamos el div con la clase boo.
const allBoo = document.querySelectorAll('div.boo');

// Obtenemos el ancho y el alto del div mediante destructuring. Todos los divs son iguales.
// Basta con comprobar la altura y el ancho del div de la posición 0.
const { height, width } = allBoo[0].getBoundingClientRect();

// Intervalo que se repite cada segundo.
setInterval(() => {
    // Modificamos el color del body.
    body.style.backgroundColor = `rgb(
        ${randomValue(255)}, 
        ${randomValue(255)}, 
        ${randomValue(255)}
    )`;

    // Calculamos la distancia máxima a la cuál podemos separar el div en el eje vertical.
    const maxHeight = window.innerHeight - height;

    // Lo mismo para el eje horizontal.
    const maxWidth = window.innerWidth - width;

    // Recorremos el array de divs.
    for (const value of allBoo) {
        // Modificamos las propiedades top y left del div.
        value.style.cssText = `
            top: ${randomValue(maxHeight)}px;
            left: ${randomValue(maxWidth)}px;
        `;
    }
}, 1000);
