const { c } = require('tar');
const Blog = require('../models/blog');

const getAll = async (req, res) => {
    try {
        const result = await Blog.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener los blogs: ", err);
        res.status(500).json({ error: "Error al obtener los blogs" });
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Blog.getById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener el blog: ", err);
        res.status(500).json({ error: "Error al obtener el blog" });
    }
}

const create = async (req, res) => {
    try {
        const blog = req.body;
        const result = await Blog.create(blog);
        res.status(201).json({ id: result });
    } catch (err) {
        console.error("Error al crear el blog: ", err);
        res.status(500).json({ error: "Error al crear el blog" });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const result = await Blog.update(id, datosActualizados);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar el blog: ", err);
        res.status(500).json({ error: "Error al actualizar el blog" });
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Blog.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al eliminar el blog: ", err);
        res.status(500).json({ error: "Error al eliminar el blog" });
    }
}

const deactivateEntry = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Blog.deactivateEntry(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al desactivar la entrada del blog: ", err);
        res.status(500).json({ error: "Error al desactivar la entrada del blog" });
    }
}
module.exports = {
    getAll,
    getById,
    create, 
    update,
    remove,
    deactivateEntry
};