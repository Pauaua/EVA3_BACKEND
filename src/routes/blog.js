const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Obtener todos los blogs
router.get('/', blogController.getAll);

// Obtener blog por id
router.get('/:id', blogController.getById);

// Crear blog
router.post('/', blogController.create);

// Actualizar blog por id
router.put('/:id', blogController.update);

// Eliminar blog por email
router.delete('/:email', blogController.remove);

// Desactivar entrada del blog
router.put('/desactivate', blogController.deactivateEntry);

module.exports = router;