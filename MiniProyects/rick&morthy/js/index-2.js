'use strict';

// Seleccionamos los nodos que vamos a modificar.
const charListUl = document.querySelector('ul.char-list');

// Función que retorna el listado de personajes.
const getCharacters = async () => {
    try {
        // Variable que almacenará el valor de la página siguiente. Inicializamos esta variable
        // con la URL base.
        let nextPage = 'https://rickandmortyapi.com/api/character';

        // Array donde iremos pusheando todos los personajes.
        const characters = [];

        // Mientras que nextPage tenga contenido seguimos pidiento la info de la página siguiente.
        while (nextPage) {
            // Obtenemos el response.
            const res = await fetch(nextPage);

            // Desencriptamos el body del response y nos quedamos con la propiedad que nos interesa.
            const { info, results } = await res.json();

            // Actualizamos el valor de nextPage.
            nextPage = info.next;

            // Pusheamos los 20 personajes de la página actual.
            characters.push(...results);
        }

        // Retornamos el array de personajes.
        return characters;
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
