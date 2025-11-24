'use strict';

const students = [
    {
        name: 'Sara',
        age: 39,
    },
    {
        name: 'Sofía',
        age: 23,
    },
    {
        name: 'Sergio',
        age: 57,
    },
    {
        name: 'Pablo',
        age: 18,
    },
    {
        name: 'Sonia',
        age: 33,
    },
    {
        name: 'Selena',
        age: 45,
    },
];

// Seleccionamos el elemento lista.
const ul = document.querySelector('ul.student-list');

// Función que renderiza los estudiantes.
const render = () => {
    // Creamos un fragmento de documento.
    const frag = document.createDocumentFragment();

    // Recorremos el array.
    for (const value of students) {
        // Creamos el <li>.
        const li = document.createElement('li');

        // Agregamos el contenido.
        li.innerHTML = `
            <img src="./images/avatar.png" alt="${value.name}" />
            <h2>${value.name}</h2>
            <p>${value.age} años.</p>
        `;

        // Agregamos el <li> como hijo del fragmento.
        frag.append(li);
    }

    // Agregamos el fragmento como hijo del <ul>.
    ul.append(frag);
};

// Llamamos a la función anterior.
render();
