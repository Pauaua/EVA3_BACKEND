const express = require('express');
const router = express.Router();
const enviosController = require('../controllers/enviosController');

/**
 * @swagger
 * tags:
 *   name: Envíos
 *   description: Gestión de envíos de productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Envio:
 *       type: object
 *       required:
 *         - reserva_id
 *         - estado
 *         - direccion
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         reserva_id:
 *           type: integer
 *           example: 5
 *         fecha_despacho:
 *           type: string
 *           format: date
 *           example: "2023-11-28"
 *         estado:
 *           type: string
 *           enum: [pendiente, en_transito, entregado, cancelado]
 *           example: "pendiente"
 *         direccion:
 *           type: string
 *           example: "Av. Principal 123, Santiago"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/envios:
 *   get:
 *     summary: Obtener todos los envíos
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de envíos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Envio'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron envíos
 */

// Obtener todos los envioss
router.get('/', enviosController.getAll);

/**
 * @swagger
 * /api/envios/{id}:
 *   get:
 *     summary: Obtener un envío por ID
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del envío
 *     responses:
 *       200:
 *         description: Envío encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envio'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío no encontrado
 */

// Obtener envios por id
router.get('/:id', enviosController.getById);

/**
 * @swagger
 * /api/envios:
 *   post:
 *     summary: Crear un nuevo envío
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envio'
 *     responses:
 *       201:
 *         description: Envío creado
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

// Crear envios
router.post('/', enviosController.create);

/**
 * @swagger
 * /api/envios/{id}:
 *   put:
 *     summary: Actualizar un envío
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del envío a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envio'
 *     responses:
 *       200:
 *         description: Envío actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Envío actualizado exitosamente."
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío no encontrado
 */

// Actualizar envios por id
router.put('/:id', enviosController.update);

/**
 * @swagger
 * /api/envios/{id}:
 *   delete:
 *     summary: Eliminar un envío
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del envío a eliminar
 *     responses:
 *       200:
 *         description: Envío eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Envío eliminado exitosamente."
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío no encontrado
 */

// Eliminar envios por email
router.delete('/:email', enviosController.remove);


module.exports = router;