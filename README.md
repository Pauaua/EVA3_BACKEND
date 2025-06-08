# Antigüedades Sthandier - Backend

Este proyecto es el backend de **Antigüedades Sthandier**, una API RESTful desarrollada en Node.js con Express y MySQL para la gestión de productos, reservas, usuarios, pagos, envíos y blog de una tienda de antigüedades.

## Características

- CRUD de productos, reservas, usuarios, pagos, envíos y entradas de blog.
- Documentación interactiva con Swagger UI.
- Autenticación y autorización con JWT (esquematizado en Swagger).
- Separación por capas: rutas, controladores, modelos y configuración.
- Uso de variables de entorno para la configuración de la base de datos.

## Estructura del Proyecto

```
.env
app.js
package.json
swagger.json
src/
  config/
    db.js
  controllers/
    blogController.js
    enviosController.js
    pagosController.js
    productosController.js
    reservasController.js
    usuarioController.js
  models/
    blog.js
    envios.js
    pagos.js
    productos.js
    reservas.js
    usuario.js
  routes/
    blog.js
    envios.js
    index.js
    pagos.js
    productos.js
    reservas.js
    usuario.js
```

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Configura las variables de entorno en el archivo `.env`:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=antiguedades
   DB_PORT=3306
   ```

4. Asegúrate de tener una base de datos MySQL llamada `antiguedades` y las tablas necesarias.

## Uso

- Inicia el servidor en modo desarrollo:

  ```sh
  npm run dev
  ```

- O en modo producción:

  ```sh
  npm start
  ```

- Accede a la documentación de la API en: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principales

- `/api/productos` - Gestión de productos
- `/api/reservas` - Gestión de reservas
- `/api/usuarios` - Gestión de usuarios
- `/api/pagos` - Gestión de pagos
- `/api/envios` - Gestión de envíos
- `/api/blog` - Gestión de entradas del blog

Consulta la documentación Swagger para detalles de cada endpoint y los modelos de datos.

## Tecnologías

- Node.js
- Express
- MySQL (mysql2)
- Swagger (swagger-jsdoc, swagger-ui-express)
- dotenv

# Utilización IA

Corrección de código, guía en resolución de errores y edición de README