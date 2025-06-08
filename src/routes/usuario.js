const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - contraseña
 *         - rol
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           example: "juan@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *         rol:
 *           type: string
 *           enum: [admin, cliente, empleado]
 *           example: "cliente"
 *         telefono:
 *           type: string
 *           example: "+56912345678"
 *         direccion:
 *           type: string
 *           example: "Av. Principal 123"
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           example: "Activo"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron usuarios
 */

// Obtener todos los usuarios
router.get('/', usuarioController.getAll);


/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */

// Obtener usuario por id
router.get('/:id', usuarioController.getById);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado exitosamente."
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El correo electrónico ya está registrado
 */

// Crear usuario
router.post('/', usuarioController.create);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: Email del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado exitosamente."
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */

// Actualizar usuario por id
router.put('/:id', usuarioController.update);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: Email del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado exitosamente."
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */

// Eliminar usuario por email
router.delete('/:email', usuarioController.remove);

/**
 * @swagger
 * /api/usuarios/desactivar:
 *   post:
 *     summary: Desactivar un usuario (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@sthandier.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "admin123"
 *               email_modificar:
 *                 type: string
 *                 format: email
 *                 example: "usuario@example.com"
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *                 example: "Inactivo"
 *     responses:
 *       200:
 *         description: Estado del usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario usuario@example.com actualizado exitosamente."
 *       401:
 *         description: No autorizado o credenciales incorrectas
 *       403:
 *         description: Usuario no tiene permisos de administrador
 *       404:
 *         description: Usuario no encontrado
 */

// Desactivar usuario
router.post('/desactivar', usuarioController.desactiveUser);

module.exports = router;