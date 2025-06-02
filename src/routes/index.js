const express = require('express');
const router = express.Router();    

//Importar rutas
const usuarioRoutes = require('./usuario');
const productosRoutes = require('./productos');
const enviosRoutes = require('./envios');
const pagosRoutes = require('./pagos');
const reservasRoutes = require('./reservas');
const blogRoutes = require('./blog');

//Asociar rutas 

router.use('/usuarios', usuarioRoutes);
router.use('/productos', productosRoutes);
router.use('/envios', enviosRoutes);
router.use('/pagos', pagosRoutes);
router.use('/reservas', reservasRoutes);
router.use('/blog', blogRoutes);

//Middleware para rutas no encontradas
router.use((req, res) => {
    console.error("Ruta no orquestada en index.js: " + req.method + " " + req.url);
    res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = router;