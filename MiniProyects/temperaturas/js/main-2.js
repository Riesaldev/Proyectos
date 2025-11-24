/**
 * Completa la tabla de temperaturas tomando como referencia
 * este array de ciudades. Tendrás que usar las siguientes
 * clases para cambiar el color de fondo de cada temperatura (td).
 *
 *  - lower: temp. menor que 4 (fondo azul).
 *
 *  - low: temp. entre 4 y 20 (fondo verde).
 *
 *  - medium: temp. entre 20 y 30 (fondo naranja).
 *
 *  - high: temp. mayor de 30 (fondo rojo).
 *
 */

'use strict';

const cities = [
    {
        name: 'A Coruña',
        min: 17,
        max: 23,
    },
    {
        name: 'Ferrol',
        min: 15,
        max: 32,
    },
    {
        name: 'Lugo',
        min: -20,
        max: 31,
    },
    {
        name: 'Ourense',
        min: 18,
        max: 35,
    },
    {
        name: 'Pontevedra',
        min: 18,
        max: 29,
    },
];

// Seleccionamos los nodos con los que vamos a trabajar.
const tbody = document.querySelector('tbody');

// Función que retorna un string concreto en función del valor
// de la temperatura recibida como argumento.
const getTemp = (temp) => {
    if (temp < 4) {
        return 'lower';
    } else if (temp < 20) {
        return 'low';
    } else if (temp < 30) {
        return 'medium';
    } else {
        return 'high';
    }
};

// Creamos un fragmento de documento.
const frag = document.createDocumentFragment();

// Recorremos el array de ciudades.
for (const value of cities) {
    // Creamos un <tr>.
    const tr = document.createElement('tr');

    // Agregamos el contenido.
    tr.innerHTML = `
        <td>${value.name}</td>
        <td class="${getTemp(value.min)}">${value.max}</td>
        <td class="${getTemp(value.max)}">${value.min}</td>
    `;

    // Agregamos el <tr> como hijo del fragmento.
    frag.appendChild(tr);
}

// Al salir del bucle, agregamos el fragmento como hijo del <tbody>.
tbody.append(frag);
