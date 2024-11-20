"use strict"; // Modo estricto para una mejor gestión de errores y prácticas recomendadas

const timeline = document.querySelector(".timeline"); // Selecciona el elemento de la línea temporal en el DOM
const eventForm = document.getElementById("eventForm"); // Selecciona el formulario de eventos en el DOM
let events = []; // Declarar la variable events en el ámbito global para almacenar los eventos

// Función asíncrona para obtener los eventos desde un archivo JSON
async function fetchEvents() {
    try {
        const response = await fetch("./Js/zelda-timeline.json"); // Realiza una solicitud para obtener el archivo JSON
        events = await response.json(); // Convierte la respuesta en un objeto JSON y lo asigna a la variable events
        return events; // Devuelve los eventos
    } catch (error) {
        console.error("Error fetching events:", error); // Muestra un mensaje de error en la consola si la solicitud falla
        return []; // Devuelve un array vacío en caso de error
    }
}

// Función para crear una tarjeta de evento en el DOM
function createEventCard(event) {
    const div = document.createElement("div"); // Crea un nuevo elemento div
    div.classList.add("event"); // Añade la clase 'event' al div

    // Añade el contenido HTML a la tarjeta de evento
    div.innerHTML = `
        <img src="${event.image}" alt="${event.title}"> <!-- Imagen del evento -->
        <h2>${event.date} - ${event.title}</h2> <!-- Fecha y título del evento -->
        <p>${event.text}</p> <!-- Descripción del evento -->
    `;

    return div; // Devuelve el div creado
}

// Función para mostrar los eventos en la línea temporal
function displayEvents() {
    const sortedEvents = events.sort((a, b) => a.date - b.date); // Ordena los eventos por fecha
    const fragment = document.createDocumentFragment(); // Crea un fragmento de documento para mejorar el rendimiento

    // Itera sobre los eventos ordenados y crea una tarjeta para cada uno
    sortedEvents.forEach((event) => {
        const eventCard = createEventCard(event); // Crea una tarjeta de evento
        fragment.appendChild(eventCard); // Añade la tarjeta al fragmento
    });

    timeline.appendChild(fragment); // Añade el fragmento a la línea temporal en el DOM
}

// Manejador de eventos para el formulario de añadir nuevos eventos
eventForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const fileInput = eventForm.image.files[0]; // Obtiene el archivo de imagen seleccionado
    const reader = new FileReader(); // Crea un nuevo lector de archivos

    // Función que se ejecuta cuando el lector de archivos ha leído el archivo
    reader.onload = function (event) {
        const newEvent = {
            date: eventForm.year.value, // Obtiene el valor del año del formulario
            title: eventForm.title.value, // Obtiene el valor del título del formulario
            image: event.target.result, // Obtiene la URL de la imagen leída
            text: eventForm.text.value, // Obtiene el valor de la descripción del formulario
        };
        events.push(newEvent); // Añade el nuevo evento al array de eventos
        timeline.innerHTML = ""; // Limpia la línea temporal
        displayEvents(); // Vuelve a mostrar los eventos con el nuevo evento añadido
        eventForm.reset(); // Resetea el formulario
    };

    if (fileInput) {
        reader.readAsDataURL(fileInput); // Lee el archivo de imagen como una URL de datos
    } else {
        const newEvent = {
            date: eventForm.year.value, // Obtiene el valor del año del formulario
            title: eventForm.title.value, // Obtiene el valor del título del formulario
            image: "/css/image/empty.jpg", // Usa una imagen predeterminada si no se selecciona ninguna imagen
            text: eventForm.text.value, // Obtiene el valor de la descripción del formulario
        };
        events.push(newEvent); // Añade el nuevo evento al array de eventos
        timeline.innerHTML = ""; // Limpia la línea temporal
        displayEvents(); // Vuelve a mostrar los eventos con el nuevo evento añadido
        eventForm.reset(); // Resetea el formulario
    }
});

// Función de inicialización para cargar y mostrar los eventos al cargar la página
async function init() {
    await fetchEvents(); // Obtiene los eventos desde el archivo JSON
    displayEvents(); // Muestra los eventos en la línea temporal
}

init(); // Llama a la función de inicialización
