'use strict';

// Seleccionamos el <ul> sobre el que agregaremos la info de cada provincia.
const ul = document.querySelector('ul.provinces');

// Función asíncrona que retorna el nombre y código de cada provincia.
const getProvincesCode = async () => {
    try {
        // Obtenemos el response.
        const res = await fetch(
            'https://www.el-tiempo.net/api/json/v2/provincias'
        );

        // Desencriptamos el body del response y obtenemos las provincias por destructuring.
        const { provincias } = await res.json();

        // Generamos un array con el nombre y código de la provincia.
        return provincias.map((value) => {
            return {
                name: value.NOMBRE_PROVINCIA,
                code: value.CODPROV,
            };
        });
    } catch (err) {
        console.error(err);
    }
};

// Función asíncrona que se encarga obtener la info del tiempo que hace en cada provincia.
const getProvincesWeather = async () => {
    try {
        // Obtenemos el array con la info de las provincias.
        const provinces = await getProvincesCode();

        // Array donde pushearemos la info del tiempo de cada provincia.
        const provincesWeather = [];

        // Recorremos las provincias para buscar la info de cada provincia.
        for (const value of provinces) {
            // Obtenemos el response.
            const res = await fetch(
                `https://www.el-tiempo.net/api/json/v2/provincias/${value.code}`
            );

            // Desencriptamos el body del response y nos quedamos con la propiedad today.
            const { today } = await res.json();

            // Pusheamos la info que nos interesa en el array que creamos.
            provincesWeather.push({
                name: value.name,
                weather: today.p,
            });
        }

        // Retornamos el array.
        return provincesWeather;
    } catch (err) {
        console.error(err);
    }
};

// Función asíncrona que renderiza los elementos en el HTML.
const renderInfo = async () => {
    try {
        // Obtenemos la info meteorológica de cada provincia.
        const provincesWeather = await getProvincesWeather();

        // Creamos un fragmento de documento.
        const frag = document.createDocumentFragment();

        // Recorremos el array con la info meteorológica de cada provincia.
        for (const value of provincesWeather) {
            // Creamos un <li>.
            const li = document.createElement('li');

            // Agregamos el contenido.
            li.innerHTML = `
                <h2>${value.name}</h2>
                <p>${value.weather}</p>
            `;

            // Agregamos el <li> como hijo del fragmento.
            frag.append(li);
        }

        // Agregamos el fragmento como hijo del <ul>.
        ul.append(frag);
    } catch (err) {
        console.error(err);
    }
};

// Llamamos a la función anterior.
renderInfo();
