'use strict';

/**
 * ##################
 * ## Ejercicio 12 ##
 * ##################
 *
 * Una pizerría ofrece pizzas "mitad y mitad".
 *
 * Cada mitad debe corresponderse a una pizza de su catálogo, pero éste cambia
 * constantemente, por lo que el número de combinaciones posibles también.
 *
 * Completa la función para que retorne un array con la lista de combinaciones
 * posibles. Ten en cuenta esto:
 *
 *  - Seguramente en tu primera aproximación devuelva pizzas con la misma
 *    combinación pero al revés (ej: carbonara y barbacoa, barbacoa y carbonara)
 *    pero ¡son la misma pizza!. Debemos evitar eso.
 *
 *  - De la misma manera, si las dos mitades son iguales (ej: carbonara y carbonara)
 *    no sería una pizza "mitad y mitad", sino una pizza normal.
 *
 */

const pizzas = [
    'margarita',
    'cuatro quesos',
    'prosciutto',
    'carbonara',
    'barbacoa',
    'tropical',
];

const pizzaCombinations = (pizzaArr) => {
    const result = [];

    // Bucle principal.
    for (let i = 0; i < pizzaArr.length; i++) {
        // Primera mitad.
        const firstPizza = pizzaArr[i];

        // Bucle secundario.
        for (let j = i + 1; j < pizzaArr.length; j++) {
            // Segunda mitad.
            const secondPizza = pizzaArr[j];

            // Pusheamos la combinación.
            result.push(`${firstPizza} y ${secondPizza}`);
        }
    }

    return result;
};

// Llamamos a la función anterior y le pasamos el argumento.
console.log(pizzaCombinations(pizzas));
