const Pagos = require('../models/pagos');

const getAll = async (req, res) => {
    try {
        const result = await Pagos.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener los pagos: ", err);
        res.status(500).json({ error: "Error al obtener los pagos" });
    }
}
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Pagos.getById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener el pago: ", err);
        res.status(500).json({ error: "Error al obtener el pago" });
    }
}

const create = async (req, res) => {
    try {
        const pago = req.body;
        const result = await Pagos.create(pago);
        res.status(201).json({ id: result });
    } catch (err) {
        console.error("Error al crear el pago: ", err);
        res.status(500).json({ error: "Error al crear el pago" });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const result = await Pagos.update(id, datosActualizados);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar el pago: ", err);
        res.status(500).json({ error: "Error al actualizar el pago" });
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Pagos.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al eliminar el pago: ", err);
        res.status(500).json({ error: "Error al eliminar el pago" });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};