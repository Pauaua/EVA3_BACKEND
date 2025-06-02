const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Gestión de reservas de productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reserva:
 *       type: object
 *       required:
 *         - usuario_id
 *         - producto_id
 *         - cantidad
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         usuario_id:
 *           type: integer
 *           example: 5
 *         producto_id:
 *           type: integer
 *           example: 10
 *         fecha_reserva:
 *           type: string
 *           format: date-time
 *           example: "2023-11-25T14:30:00Z"
 *         cantidad:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *         estado:
 *           type: string
 *           enum: [pendiente, confirmada, cancelada, completada]
 *           example: "pendiente"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron reservas
 */

// Obtener todos los reservass
router.get('/', reservasController.getAll);

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Reserva no encontrada
 */

// Obtener reservas por id
router.get('/:id', reservasController.getById);

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       201:
 *         description: Reserva creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertId:
 *                   type: integer
 *                   example: 15
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */

// Crear reservas
router.post('/', reservasController.create);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva actualizada exitosamente."
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Reserva no encontrada
 */

// Actualizar reservas por id
router.put('/:id', reservasController.update);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva eliminada exitosamente."
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Reserva no encontrada
 */

// Eliminar reservas por id
router.delete('/:id', reservasController.remove);


module.exports = router;