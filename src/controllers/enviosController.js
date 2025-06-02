const Envios = require('../models/envios');

const getAll = async (req, res) => {
    try {
        const result = await Envios.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener los envíos: ", err);
        res.status(500).json({ error: "Error al obtener los envíos" });
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Envios.getById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener el envío: ", err);
        res.status(500).json({ error: "Error al obtener el envío" });
    }
}

const create = async (req, res) => {
    try {
        const envio = req.body;
        const result = await Envios.create(envio);
        res.status(201).json({ id: result });
    } catch (err) {
        console.error("Error al crear el envío: ", err);
        res.status(500).json({ error: "Error al crear el envío" });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const result = await Envios.update(id, datosActualizados);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar el envío: ", err);
        res.status(500).json({ error: "Error al actualizar el envío" });
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Envios.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al eliminar el envío: ", err);
        res.status(500).json({ error: "Error al eliminar el envío" });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};

