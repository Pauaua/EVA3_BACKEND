const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Gestión de entradas del blog
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EntradaBlog:
 *       type: object
 *       required:
 *         - titulo
 *         - resumen
 *         - creado_por
 *         - cuerpo_texto
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         titulo:
 *           type: string
 *           example: "Historia de las antigüedades"
 *         resumen:
 *           type: string
 *           example: "Un recorrido por las antigüedades más valiosas"
 *         creado_por:
 *           type: integer
 *           example: 3
 *         cuerpo_texto:
 *           type: string
 *           example: "Contenido completo del artículo..."
 *         referencias:
 *           type: string
 *           example: "https://ejemplo.com/fuente"
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           example: "2023-11-25T10:30:00Z"
 *         estado:
 *           type: integer
 *           enum: [0, 1]
 *           description: "0 = Inactivo, 1 = Activo"
 *           example: 1
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Obtener todas las entradas del blog
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Lista de entradas del blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EntradaBlog'
 *       404:
 *         description: No se encontraron entradas
 */
router.get('/', BlogController.getAll);

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Obtener una entrada del blog por ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrada del blog
 *     responses:
 *       200:
 *         description: Entrada encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntradaBlog'
 *       404:
 *         description: Entrada no encontrada
 */
router.get('/:id', BlogController.getById);

/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Crear una nueva entrada del blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntradaBlog'
 *     responses:
 *       201:
 *         description: Entrada creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertId:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', BlogController.create);

/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Actualizar una entrada del blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrada a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntradaBlog'
 *     responses:
 *       200:
 *         description: Entrada actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entrada actualizada exitosamente."
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Entrada no encontrada
 */
router.put('/:id', BlogController.update);

/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Eliminar una entrada del blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrada a eliminar
 *     responses:
 *       200:
 *         description: Entrada eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entrada eliminada exitosamente."
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Entrada no encontrada
 */
router.delete('/:id', BlogController.remove);

/**
 * @swagger
 * /api/blog/desactivar:
 *   post:
 *     summary: Desactivar una entrada del blog (por ID o título)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 required: false
 *                 example: 5
 *               titulo:
 *                 type: string
 *                 required: false
 *                 example: "Historia de las antigüedades"
 *     responses:
 *       200:
 *         description: Entrada desactivada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entrada desactivada exitosamente."
 *       400:
 *         description: Se debe proporcionar ID o título
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Entrada no encontrada
 */
router.post('/desactivar', BlogController.deactivateEntry);

module.exports = router;