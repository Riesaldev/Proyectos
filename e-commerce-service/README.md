# Ecommerse Service
Este es un servicio de ecommerce desarrollado con Express. Proporciona una API para gestionar productos, usuarios, órdenes y más.

# Requisitos

- NodeJs (V20.18)
- npm (V10.9)
- MySQL

## Instalación

Sigue estos pasos para poner en funcionamiento el servicio:
#### 1 Instalar dependencias

```sh
npm install
```
#### 2 Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```sh
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
SECRET=
```
#### 2 Configurar la base de datos
Asegúrate de tener instalado y configurado MySQL. Desde worckbench o programa que uses, crea una base de datos. Y luego ejecuta estos comandos:
```sh
npm run initDB
npm run fillTables
```
_El primer comando crea las tablas necesarias y el segundo "pre carga" las tablas de productos y sus catagorías_
#### 2 Iniciar el servidor
```sh
npm run dev
```
El servicio estará disponible en: `http://localhost:3001`

### Endpoints

### Usuarios
- GET `/users` - Obtiene los datos del usuario registrado (requiere estar autenticado)
- POST `/users/register` - Registra un usuario nuevo (recibe "email" y "password")
- POST `/users/login` - Permite identificar al usuario registrado (recibe "email" y "password")
- PUT `/users/edit` - Permite editar los datos del usuario logueado (requiere estar autenticado)
- GET `/users/orders` - Devuelve las órdenes de compra del usuario logueado

### Productos
- GET `/products` - Obtiene todos los productos con sus categorías
- GET `/products/:productId` - Devuelve los datos de un producto en específico

### Orders
- POST `/orders` - Registra una orden de compra del usuario logueado

Proyecto realizado por Nelson Albera solo con fines educativos