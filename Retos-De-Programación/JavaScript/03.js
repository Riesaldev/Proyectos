/*
EJERCICIO:
Muestra ejemplos de creación de todas las estructuras soportadas por defecto
en tu lenguaje.
Utiliza operaciones de inserción, borrado, actualización y ordenación.

DIFICULTAD EXTRA (opcional):
Crea una agenda de contactos por terminal.
Debes implementar funcionalidades de búsqueda, inserción, actualización
y eliminación de contactos.
- Cada contacto debe tener un nombre y un número de teléfono.
- El programa solicita en primer lugar cuál es la operación que se quiere realizar,
y a continuación los datos necesarios para llevarla a cabo.
- El programa no puede dejar introducir números de teléfono no numéricos y con más
de 11 dígitos (o el número de dígitos que quieras).
- También se debe proponer una operación de finalización del programa.
 */

// Ejemplos de estructuras soportadas por defecto en JavaScript:

// Arrays
let array = [ 1, 2, 3 ];

array.push( 4 ); // Inserción
console.log( "Array después de inserción:", array );

array.splice( 1, 1 ); // Borrado
console.log( "Array después de borrado:", array );

array[ 0 ] = 10; // Actualización
console.log( "Array después de actualización:", array );

array.sort( ( a, b ) => a - b ); // Ordenación
console.log( "Array después del ordenamiento ", array );

// Objetos
let objeto = { clave1: "valor1", clave2: "valor2" };

objeto.clave3 = "valor3"; // Inserción
console.log( "Objeto después de inserción:", objeto );

delete objeto.clave2; // Borrado
console.log( "Objeto después de borrado:", objeto );

objeto.clave1 = "nuevoValor1"; // Actualización
console.log( "Objeto después de la actualización", objeto );

// Mapas
let mapa = new Map();

mapa.set( "clave1", "valor1" ); // Inserción
console.log( "Mapa después de inserción:", mapa );

mapa.delete( "clave1" ); // Borrado
console.log( "Mapa después de borrado:", mapa );

mapa.set( "clave1", "nuevoValor1" ); // Actualización
console.log( "Mapa después de la actualización", mapa );

// Conjuntos
let conjunto = new Set( [ 1, 2, 3 ] );

conjunto.add( 4 ); // Inserción
console.log( "Conjunto después de inserción:", conjunto );

conjunto.delete( 2 ); // Borrado
console.log( "Conjunto después de borrado:", conjunto );


// DIFICULTAD EXTRA: Agenda de contactos

function agendaDeContactos () {

    let contactos = [];

    function mostrarMenu () {
        console.log( "--- Agenda de Contactos ---" );
        console.log( "1. Insertar contacto" );
        console.log( "2. Buscar contacto" );
        console.log( "3. Actualizar contacto" );
        console.log( "4. Eliminar contacto" );
        console.log( "5. Mostrar todos los contactos" );
        console.log( "6. Salir" );
    }

    function insertarContacto () {
        let nombre = prompt( "Introduce el nombre del contacto:" );
        let teléfono = prompt( "Introduce el número de teléfono (máximo 11 dígitos):" );

        if ( !/^\d{1,11}$/.test( teléfono ) )
        {
            console.log( "Número de teléfono no válido." );
            return;
        }

        contactos.push( { nombre, teléfono } );
        console.log( "Contacto añadido." );
    }

    function buscarContacto () {
        let nombre = prompt( "Introduce el nombre del contacto a buscar:" );
        let resultado = contactos.filter( ( contacto ) => contacto.nombre.includes( nombre ) );

        if ( resultado.length > 0 )
        {
            console.log( "Contactos encontrados:" );
            resultado.forEach( ( contacto ) => console.log( `Nombre: ${ contacto.nombre }, Teléfono: ${ contacto.teléfono }` ) );
        }
        else
        {
            console.log( "No se encontraron contactos con ese nombre." );
        }
    }
}