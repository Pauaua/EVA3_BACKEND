const db = require('../config/db');
const Usuarios = require('../models/usuario');

const getAll = async (req, res) => {
    try {
        const result = await Usuarios.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener los usuarios: ", err);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Usuarios.getById({ id });
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener el usuario: ", err);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

const create = async (req, res) => {
    try {
        const usuario = req.body;
        const result = await Usuarios.create(usuario);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error al crear el usuario: ", err);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

const update = async (req, res) => {
    try {
        const usuario = req.body;
        usuario.id = req.params.id; // Asegura que el id venga de la URL
        const result = await Usuarios.update(usuario);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar el usuario: ", err);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

const remove = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await Usuarios.remove({ email });
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al eliminar el usuario: ", err);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

const desactiveUser = async (req, res) => {
  try {
    const { email, email_modificar, estado } = req.body;

    // Verificar si es admin
    const [adminUser] = await db.query(
      'SELECT rol FROM usuarios WHERE email = ?',
      [email]
    );

    if (adminUser[0].rol !== 'admin') {
      return res.status(403).json({ error: 'Solo administradores pueden desactivar usuarios' });
    }

    // Actualizar estado de usuario
    const [result] = await db.query(
      'UPDATE usuarios SET estado = ? WHERE email = ?',
      [estado, email_modificar]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: `Usuario ${email_modificar} actualizado a estado: ${estado}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove, desactiveUser };