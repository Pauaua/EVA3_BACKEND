const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');


/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Operaciones relacionadas con productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Espejo Vintage"
 *         descripcion:
 *           type: string
 *           example: "Espejo antiguo tallado a mano"
 *         precio:
 *           type: number
 *           format: float
 *           example: 25000.50
 *         cantidad:
 *           type: integer
 *           example: 5
 *         estado_reserva:
 *           type: string
 *           enum: [disponible, reservado, agotado]
 *           example: "disponible"
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           example: "2023-11-20T12:00:00Z"
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       404:
 *         description: No se encontraron productos
 */

// Obtener todos los productoss
router.get('/', productosController.getAll);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */

router.get('/:id', productosController.getById);

/**
 * @swagger
 * /api/productos/reserva/{reserva_id}:
 *   get:
 *     summary: Obtener productos por ID de reserva
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Lista de productos asociados a la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       404:
 *         description: No se encontraron productos para esta reserva
 */

// Obtener productos por reserva
router.get('/:reserva_id', productosController.getByReservaId);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertId:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Error en los datos proporcionados
 *       409:
 *         description: El producto ya existe
 */
router.post('/', productosController.create);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto actualizado exitosamente."
 *       404:
 *         description: Producto no encontrado
 */

router.put('/:id', productosController.update);

/**
 * @swagger
 * /api/productos/{id}/stock:
 *   patch:
 *     summary: Actualizar stock de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Stock actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cantidad de productos actualizada exitosamente."
 *       404:
 *         description: Producto no encontrado
 */

// Actualizar stock de productos 
router.put('/:id', productosController.updateStock);

/**
 * @swagger
 * /api/productos/{id}/estado:
 *   patch:
 *     summary: Actualizar estado de reserva de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado_reserva:
 *                 type: string
 *                 enum: [disponible, reservado, agotado]
 *                 example: "reservado"
 *     responses:
 *       200:
 *         description: Estado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado de reserva actualizado exitosamente."
 *       404:
 *         description: Producto no encontrado
 */

// Actualizar estado de reserva de productos
router.put('/:id', productosController.updateEstado);

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto eliminado exitosamente."
 *       404:
 *         description: Producto no encontrado
 */

// Eliminar productos por id
router.delete('/:id', productosController.remove);




module.exports = router;