'use strict';

/**
 * #################
 * ## Ejercicio 4 ##
 * #################
 *
 * Crea un juego de "Piedra, Papel o Tijera" donde el usuario elige una de las
 * tres opciones y la computadora elige aleatoriamente una también.
 *
 * El programa debe determinar el ganador y sumar 1 punto según las siguientes reglas:
 *   - Piedra gana a tijera.
 *   - Tijera gana a papel.
 *   - Papel gana a piedra.
 *
 * Si ambos eligen la misma opción, es un empate, no suma puntos. El juego terminará
 * si el usuario o la computadora acumulan 3 puntos, y se mostrará un mensaje indicando
 * la victoria o la derrota.
 *
 * Para darte una idea, utiliza valores numéricos para simular cada una de las tres
 * opciones: piedra (1), papel (2) o tijera (3). Para la elección de la máquina utiliza
 * el objeto Math para generar un valor entero aleatorio entre 1 y 3.
 *
 */

// Establecemos la puntuación del jugador y la puntuación de la computadora.
let player = 0;
let com = 0;

// Mientras que la puntuación del jugador y la puntuación de la computadora son
// inferiores a 3 puntos, el bucle se repite. En el momento en que uno de los dos
// alcance los tres puntos, saldremos del bucle.
while (player < 3 && com < 3) {
    // Solicitamos un valor al usuario.
    const userChoice = Number(prompt('¿Piedra (1), papel (2) o tijera (3)?'));

    // Ahora el turno de la máquina.
    const comChoice = Math.ceil(Math.random() * 3);

    // Se comprueba quién ha ganado la ronda.
    if (userChoice === 1 && comChoice === 1) {
        console.log(
            'Jugador a sacado piedra. Computadora ha sacado piedra. ¡Empate!'
        );
    } else if (userChoice === 1 && comChoice === 2) {
        com++; // Aumentamos el contador de la computadora.
        console.log(
            'Jugador a sacado piedra. Computadora ha sacado papel. ¡Has perdido la ronda!'
        );
    } else if (userChoice === 1 && comChoice === 3) {
        player++; // Aumentamos el contador del jugador.
        console.log(
            'Jugador a sacado piedra. Computadora ha sacado tijera. ¡Has ganado la ronda!'
        );
    } else if (userChoice === 2 && comChoice === 1) {
        player++; // Aumentamos el contador del jugador.
        console.log(
            'Jugador a sacado papel. Computadora ha sacado tijera. ¡Has ganado la ronda!'
        );
    } else if (userChoice === 2 && comChoice === 2) {
        console.log(
            'Jugador a sacado papel. Computadora ha sacado papel. ¡Empate!'
        );
    } else if (userChoice === 2 && comChoice === 3) {
        com++; // Aumentamos el contador de la computadora.
        console.log(
            'Jugador a sacado papel. Computadora ha sacado tijera. ¡Has perdido la ronda!'
        );
    } else if (userChoice === 3 && comChoice === 1) {
        com++; // Aumentamos el contador de la computadora.
        console.log(
            'Jugador a sacado tijera. Computadora ha sacado piedra. ¡Has perdido la ronda!'
        );
    } else if (userChoice === 3 && comChoice === 2) {
        player++; // Aumentamos el contador del jugador.
        console.log(
            'Jugador a sacado tijera. Computadora ha sacado papel. ¡Has ganado la ronda!'
        );
    } else if (userChoice === 3 && comChoice === 3) {
        console.log(
            'Jugador a sacado tijera. Computadora ha sacado tijera. ¡Empate!'
        );
    } else {
        throw new Error('Ha ocurrido un error inesperado');
    }

    console.log(`Jugador: ${player} | Computadora: ${com}`);
}

// Al finalizar el bucle, en función de los puntos de cada jugador, se indica quién ha ganado.
if (player > 2) {
    console.log('El jugador ha ganado.');
} else {
    console.log('La computadora ha ganado');
}
