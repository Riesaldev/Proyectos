'use strict';

/**
 * Crea un reloj que se actualice en tiempo real:
 *
 *  - La hora debe ir en el <h1>
 *  - La fecha debe ir en el <h2>
 *
 * En función de la hora del día la imagen de fondo debe cambiar.
 * Para este punto basta con agregar las siguientes clases al body:
 *
 *  - morning: a partir de las 7:00.
 *
 *  - afternoon: a partir de las 13:00.
 *
 *  - night: a partir de las 21:00.
 *
 */

// Importamos la función que formatea un número.
import { formatNum } from './helpers.js';

// En primer lugar seleccionamos todos los nodos (etiquetas, tags, elementos)
// que necesitemos modificar de forma dinámica.
const body = document.body;
const header = document.querySelector('body > header');

// Array con los meses del año.
const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

// Fragmento de código que se repite cada segundo.
setInterval(() => {
    // Obtenemos la fecha actual.
    const now = new Date();

    // Obtenemos el día, el mes, el año, las horas, minutos y segundos.
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Variable que almacenará la hora. Comprobamos si los segundos son pares.
    // Si lo son añadimos los dos puntos.
    const time =
        seconds % 2 === 0
            ? `${formatNum(hours)}:${formatNum(minutes)}:${formatNum(seconds)}`
            : `${formatNum(hours)} ${formatNum(minutes)} ${formatNum(seconds)}`;

    // Añadimos el contenido al header.
    header.innerHTML = `
        <h1>${time}</h1>
        <h2>${day} de ${months[month]} de ${year}</h2>
    `;

    // Añadimos una clase distinta al body en función de la hora.
    if (hours >= 7 && hours < 13) {
        body.classList.remove('night');
        body.classList.add('morning');
    } else if (hours < 21) {
        body.classList.remove('morning');
        body.classList.add('afternoon');
    } else {
        body.classList.remove('afternoon');
        body.classList.add('night');
    }
}, 1000);
