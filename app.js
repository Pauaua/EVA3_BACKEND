const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Ruta para la página de inicio (localhost:3000)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Antigüedades Sthandier - Backend</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top: 50px;
          background-color: #f5f5f5;
        }
        h1 {
          color: #2c3e50;
        }
        a {
          color:rgb(183, 52, 219);
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <h1>¡Bienvenido al Backend de Antigüedades Sthandier!</h1>
      <p><a href="/api-docs">Documentación de la API - Swagger UI</a></p>
      <p>Estado del servidor: <strong>Activo</strong> ✅</p>
    </body>
    </html>
  `);
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  
    info: {
      title: 'API Antigüedades Sthandier',  
      version: '1.0.0',  
      description: 'Documentación para el CRUD de productos, reservas y usuarios',  
    },
    servers: [  // URL base de la API
      { url: 'http://localhost:3000/' },  
    ],
    components: { 
        securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }, 
      schemas: { // Esquemas reutilizables (modelo producto)
        Producto: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Espejo Vintage' },
            descripcion: { type: 'string', example: 'Espejo antiguo tallado a mano' },
            precio: { type: 'number', example: 25000 },
            cantidad: { type: 'integer', example: 5 },
            estado_reserva: { type: 'string', enum: ['activo', 'inactivo', 'pendiente'], example: 'inactivo' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],  
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


//Middleware 

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
});

// Importar rutas
const routes = require('./src/routes/index.js');

//asociar ruta a la aplicación
app.use('/api', routes);


//Middleware para rutas no encontradas

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

//Manejo de errores 

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.error(err.message)
    res.status(500).json({ error: 'Algo salió mal!' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});