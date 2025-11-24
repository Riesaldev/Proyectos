'use strict';

/**
 * #################
 * ## Ejercicio 3 ##
 * #################
 *
 * Utiliza lo aprendido sobre funciones para reestructurar el ejercicio de la bomba.
 * Crea la función "deactivateBomb" con el parámetro "limit":
 *
 *  - limit: nº de intentos que le daremos al usuario.
 *
 */

// Función desactivar bomba.
function deactivateBomb(limit) {
    // Generar un nº aleatorio entero del 1 al 10.
    const bombPassword = Math.ceil(Math.random() * 10);

    // Bucle que se repite tantas veces como "limit" (los intentos que le damos al usuario).
    for (let i = limit; i > 0; i--) {
        // Le pedimos al usuario una contraseña.
        const userPassword = Number(
            prompt(`Intento ${i}. Inserte una contraseña:`)
        );

        // Comprobamos si la contraseña es correcta.
        if (userPassword === bombPassword) {
            // Retornamos un valor true para indicar que el usuario ha ganado.
            return true;
        } else {
            alert('¡Contraseña incorrecta!');
        }
    }

    // Retornamos un valor false para indicar que el usuario ha perdido.
    return false;
}

// Dado que la función retorna un valor booleano, podemos llamarla dentro de los paréntisis
// del bloque if de esta forma.
if (deactivateBomb(10)) {
    alert('¡Vives un día más!');
} else {
    alert('¡BOOOOOOOOOOOOOOOOOOM!');
}
