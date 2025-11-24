'use strict';

// Seleccionamos los nodos que vamos a modificar.
const charListUl = document.querySelector('ul.char-list');

// Función que retorna el listado de personajes.
const getCharacters = async () => {
    try {
        // Obtenemos el response.
        const res = await fetch('https://rickandmortyapi.com/api/character');

        // Desencriptamos el body del response y nos quedamos con la propiedad que nos interesa.
        const { results } = await res.json();

        // Retornamos el array de personajes.
        return results;
    } catch (err) {
        console.error(err);
    }
};

// Función que renderiza la página con los personajes.
const render = async () => {
    try {
        // Obtenemos el listado de personajes.
        const characters = await getCharacters();

        // Creamos un fragmento de documeto.
        const frag = document.createDocumentFragment();

        // Recorremos el array.
        for (const value of characters) {
            // Creamos un <li>.
            const li = document.createElement('li');

            // Añadimos el contenido.
            li.innerHTML = `
                <img src="${value.image}" alt="${value.name}" />
                <h2>${value.name}</h2>
            `;

            // Agregamos el <li> como hijo del fragmento.
            frag.append(li);
        }

        // Agregamos el fragmento como hijo de la lista.
        charListUl.append(frag);
    } catch (err) {
        console.error(err);
    }
};

// Llamamos a la función anterior.
render();
