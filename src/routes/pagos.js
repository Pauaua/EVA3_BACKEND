const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');

/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Gestión de pagos del sistema
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pago:
 *       type: object
 *       required:
 *         - usuario_id
 *         - reserva_id
 *         - monto
 *         - metodo_pago
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         usuario_id:
 *           type: integer
 *           example: 5
 *         reserva_id:
 *           type: integer
 *           example: 10
 *         monto:
 *           type: number
 *           format: float
 *           example: 25000.50
 *         fecha_pago:
 *           type: string
 *           format: date-time
 *           example: "2023-11-25T14:30:00Z"
 *         metodo_pago:
 *           type: string
 *           enum: [transferencia, efectivo, tarjeta, otro]
 *           example: "transferencia"
 *         comprobante:
 *           type: string
 *           example: "TRF-123456"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/pagos:
 *   get:
 *     summary: Obtener todos los pagos
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pagos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pago'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron pagos
 */

// Obtener todos los pagoss
router.get('/', pagosController.getAll);


/**
 * @swagger
 * /api/pagos/{id}:
 *   get:
 *     summary: Obtener un pago por ID
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pago'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pago no encontrado
 */
// Obtener pagos por id
router.get('/:id', pagosController.getById);

/**
 * @swagger
 * /api/pagos:
 *   post:
 *     summary: Crear un nuevo pago
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pago'
 *     responses:
 *       201:
 *         description: Pago creado
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

// Crear pagos
router.post('/', pagosController.create);

/**
 * @swagger
 * /api/pagos/{id}:
 *   put:
 *     summary: Actualizar un pago
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pago a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pago'
 *     responses:
 *       200:
 *         description: Pago actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pago actualizado exitosamente."
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pago no encontrado
 */

// Actualizar pagos por id
router.put('/:id', pagosController.update);

/**
 * @swagger
 * /api/pagos/{id}:
 *   delete:
 *     summary: Eliminar un pago
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pago a eliminar
 *     responses:
 *       200:
 *         description: Pago eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pago eliminado exitosamente."
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pago no encontrado
 */

// Eliminar pagos por id
router.delete('/:id', pagosController.remove);


module.exports = router;