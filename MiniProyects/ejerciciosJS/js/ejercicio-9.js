'use strict';

/**
 * #################
 * ## Ejercicio 9 ##
 * #################
 *
 *  1. Obtén la suma total de todas las edades de las personas.
 *  2. Obtén la suma total de todas las edades de las personas francesas.
 *  3. Obtén un array con el nombre de todas las mascotas.
 *  4. Obtén un array con las personas que tengan gato.
 *
 */

'use strict';

const persons = [
    {
        name: 'Berto',
        country: 'ES',
        age: 44,
        pet: {
            name: 'Moon',
            type: 'perro',
        },
    },
    {
        name: 'Jess',
        country: 'UK',
        age: 29,
        pet: {
            name: 'Kit',
            type: 'gato',
        },
    },
    {
        name: 'Tom',
        country: 'UK',
        age: 36,
        pet: {
            name: 'Rex',
            type: 'perro',
        },
    },
    {
        name: 'Alexandre',
        country: 'FR',
        age: 19,
        pet: {
            name: 'Aron',
            type: 'gato',
        },
    },
    {
        name: 'Rebeca',
        country: 'ES',
        age: 32,
        pet: {
            name: 'Carbón',
            type: 'gato',
        },
    },
    {
        name: 'Stefano',
        country: 'IT',
        age: 52,
        pet: {
            name: 'Bimbo',
            type: 'perro',
        },
    },
    {
        name: 'Colette',
        country: 'FR',
        age: 22,
        pet: {
            name: 'Amadeu',
            type: 'gato',
        },
    },
];

/**
 * #######################
 * ## Suma total edades ##
 * #######################
 */

// Variable que almacenará la suma total de las edades.
let totalAge = 0;

// Obtén la suma total de todas las edades de las personas.
for (const value of persons) {
    totalAge += value.age;
}

// Mostramos el resultado.
console.log(totalAge);

/**
 * ##########################################
 * ## Suma total edades personas francesas ##
 * ##########################################
 */

let totalFrenchAges = 0;

for (const value of persons) {
    if (value.country === 'FR') {
        totalFrenchAges += value.age;
    }
}

console.log(totalFrenchAges);

/**
 * ############################
 * ## Nombre de las mascotas ##
 * ############################
 */

const petNames = persons.map((value) => {
    return value.pet.name;
});

console.log(petNames);

/**
 * #######################
 * ## Personas con gato ##
 * #######################
 */

const personsWithCats = persons.filter((value) => {
    return value.pet.type === 'gato';
});

console.log(personsWithCats);
