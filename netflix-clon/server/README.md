# Riflix - Netflix Clone

Riflix es un proyecto educativo orientado a la práctica y formación en el desarrollo de aplicaciones backend con Node.js, Express y MySQL. Este proyecto simula las funcionalidades básicas de una plataforma de streaming como Netflix, permitiendo gestionar usuarios, películas y listas de reproducción.

## Características

- **Gestión de usuarios**: Registro, autenticación y manejo de datos de usuarios.
- **Gestión de películas**: Creación, edición y eliminación de películas.
- **Listas de reproducción**: Creación de listas personalizadas para los usuarios.
- **Base de datos MySQL**: Conexión y manejo de datos utilizando MySQL.
- **Buenas prácticas**: Uso de herramientas como ESLint y Prettier para mantener un código limpio y consistente.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para la creación de aplicaciones web.
- **MySQL**: Base de datos relacional para almacenar la información.
- **dotenv**: Gestión de variables de entorno.
- **jsonwebtoken**: Manejo de autenticación mediante tokens JWT.
- **bcrypt**: Encriptación de contraseñas.
- **Nodemon**: Reinicio automático del servidor en desarrollo.
- **ESLint y Prettier**: Herramientas para mantener la calidad del código.

## Requisitos previos

- Node.js (versión 16 o superior)
- MySQL (versión 8 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/riflix.git
   cd riflix
   cd server
   npm i
   npm run dev

## Estructura del proyecto

//TODO: actualizar una vez terminado el proyecto
.
├── client/                  # Frontend (en desarrollo)
├── server/                  # Configuración del servidor
│   ├── eslint.config.js     # Configuración de ESLint
│   ├── package.json         # Dependencias y scripts
├── src/                     # Código fuente
│   ├── controllers/         # Controladores
│   ├── middlewares/         # Middlewares
│   │   ├── db/              # Conexión y configuración de la base de datos
│   │   │   ├── getPool.js   # Pool de conexiones
│   │   │   ├── initDb.js    # Inicialización de la base de datos
│   ├── models/              # Modelos de datos
│   ├── routes/              # Rutas de la API
│   ├── services/            # Servicios auxiliares
│   ├── utils/               # Utilidades
├── .env                     # Variables de entorno
├── .env.example             # Ejemplo de configuración de variables de entorno
├── .gitignore               # Archivos ignorados por Git
├── .prettierrc.json         # Configuración de Prettier
└── README.md                # Documentación del proyecto

## Base de Datos

Para este proyecto, la base de datos está diseñada para simular las funcionalidades básicas de una plataforma de streaming como Netflix. A continuación, se describe la estructura de la base de datos y las tablas principales que podrían estar involucradas:

- **Base de Datos**: Riflix
- **Tablas principales**
    users (Usuarios)

Esta tabla almacena la información de los usuarios registrados en la plataforma.
Columnas:

    id (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único del usuario.
    name (VARCHAR): Nombre del usuario.
    email (VARCHAR, UNIQUE): Correo electrónico del usuario.
    password (VARCHAR): Contraseña encriptada del usuario.
    created_at (TIMESTAMP): Fecha y hora de creación del usuario.
    movies (Películas)

Contiene la información de las películas disponibles en la plataforma.
Columnas:

    id (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único de la película.
    title (VARCHAR): Título de la película.
    description (TEXT): Descripción de la película.
    release_date (DATE): Fecha de lanzamiento de la película.
    genre (VARCHAR): Género de la película.
    created_at (TIMESTAMP): Fecha y hora de creación del registro.
    playlists (Listas de reproducción)

Almacena las listas de reproducción personalizadas creadas por los usuarios.
Columnas:

    id (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único de la lista.
    user_id (INT, FOREIGN KEY): Identificador del usuario que creó la lista.
    name (VARCHAR): Nombre de la lista de reproducción.
    created_at (TIMESTAMP): Fecha y hora de creación de la lista.
    playlist_movies (Relación entre listas de reproducción y películas)

Tabla intermedia para la relación muchos-a-muchos entre playlists y movies.
Columnas:

- **id** (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único del registro.
- **playlist_id** (INT, FOREIGN KEY): Identificador de la lista de reproducción.
- **movie_id** (INT, FOREIGN KEY): Identificador de la película.

Relaciones entre tablas:

    ** users ↔ playlists: Relación uno-a-muchos. Un usuario puede tener múltiples listas de reproducción.

    ** playlists ↔ movies: Relación muchos-a-muchos. Una lista de reproducción puede contener múltiples películas, y una película puede estar en múltiples listas de reproducción.

Esta estructura permite gestionar usuarios, películas y listas de reproducción de manera eficiente, simulando las funcionalidades básicas de una plataforma de streaming.

## Licencia

Este proyecto está bajo la licencia ISC.

Nota: Este proyecto es únicamente para fines educativos y no está asociado con Netflix.
