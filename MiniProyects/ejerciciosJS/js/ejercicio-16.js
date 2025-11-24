'use strict';

/**
 * ##################
 * ## Ejercicio 16 ##
 * ##################
 *
 * Imagina que estás en un campo de batalla representado por un array lineal.
 * En este array:
 *
 *  - Un `1` representa tu posición.
 *  - Un `2` representa la posición de un enemigo.
 *  - Un `0` representa una posición vacía.
 *
 * Crea una función `closestEnemy` que reciba un array y devuelva la distancia
 * al enemigo más cercano (en cantidad de posiciones).
 *
 * Si no hay enemigos (`2`) en el array, la función debe devolver `-1`.
 *
 * Ejemplos:
 *
 *  - Para le array [0, 0, 1, 0, 2, 0, 0] el resultado sería 2 (el enemigo está
 *    a 2 posiciones de distancia).
 *
 *  - Para le array [1, 0, 0, 0, 0, 2] el resultado sería 5 (el enemigo más cercano
 *    está a 5 posiciones de distancia).
 *
 *  - Para el array [1, 0, 0, 0] el resultado sería -1 (no hay enemigos en el array).
 *
 */
